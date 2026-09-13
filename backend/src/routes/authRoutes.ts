import { Router } from 'express'
import bcrypt from 'bcrypt'
import { pool } from '../db'
import jwt, { type SignOptions } from 'jsonwebtoken'

const router = Router()



router.post('/register', async (req, res, next) => {
  try {
    const { email, password, role } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const { rows } = await pool.query(
      `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING user_id, email, role`,
      [email, passwordHash, role]
    )
    res.status(201).json({ success: true, data: rows[0] })
  } catch (error) { next(error) }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
    const user = rows[0]
    if (!user) return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email ya password galat hai' } })

    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Email ya password galat hai' } })

       const options: SignOptions = { expiresIn: '7d' }
       const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET!, options)
       res.json({ success: true, data: { token, role: user.role } })
  } catch (error) { next(error) }
})

export default router