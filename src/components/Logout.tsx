import { useNavigate } from 'react-router-dom'
// import { Button } from './Button'

export function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <button onClick={handleLogout} className="text-sm px-3 py-1.5">
      Logout
    </button>
  )
}