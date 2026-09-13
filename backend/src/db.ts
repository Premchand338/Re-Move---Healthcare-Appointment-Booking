import 'dotenv/config'
import { Pool, types } from 'pg'

// PostgreSQL DATE values are calendar dates, not timestamps. Keep them as
// YYYY-MM-DD strings so JSON serialization cannot shift them by timezone.
types.setTypeParser(1082, (value) => value)

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing. Copy .env.example to .env and add your PostgreSQL credentials.')
}

export const pool = new Pool({ connectionString: databaseUrl })
