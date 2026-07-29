import { createContext, useContext, useState } from 'react'
import { teachers } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ng_user')
    return saved ? JSON.parse(saved) : null
  })

  function loginAsTeacher(teacherId) {
    const teacher = teachers.find((t) => t.id === teacherId) || teachers[0]
    const u = { role: 'teacher', teacher }
    setUser(u)
    localStorage.setItem('ng_user', JSON.stringify(u))
  }

  function loginAsAdmin(username) {
    const u = { role: 'admin', username: username || 'admin' }
    setUser(u)
    localStorage.setItem('ng_user', JSON.stringify(u))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('ng_user')
  }

  return (
    <AuthContext.Provider value={{ user, loginAsTeacher, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
