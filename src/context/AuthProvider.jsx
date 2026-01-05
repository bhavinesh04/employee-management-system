import { createContext, useState, useEffect } from "react"
import { getMyTasksApi } from "../services/taskService"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  // ✅ Restore login from localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem("loggedInUser")
    if (storedLogin) {
      const parsed = JSON.parse(storedLogin)
      setUser(parsed.role)
      setUserData(parsed.data)
      setToken(parsed.token)
    }
    setLoading(false)
  }, [])

  // ✅ Fetch employees ONLY when token exists
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error("Unauthorized")

      const data = await res.json()
      setEmployees(Array.isArray(data) ? data : [])
    } catch (err) {
      setEmployees([])
    }
  }

  // ✅ Proper admin employee fetch
  useEffect(() => {
  if (!token || user !== "admin") return
  fetchEmployees()
}, [token, user])

  // ✅ Employee task fetch
  const fetchMyTasks = async () => {
    if (!token) return
    try {
      const tasks = await getMyTasksApi(token)
      setUserData(prev => ({
        ...prev,
        tasks,
      }))
    } catch (error) {
    }
  }

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) return false

      const data = await res.json()

      setUser(data.user.role)
      setUserData(data.user.data)
      setToken(data.token)

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: data.user.role,
          data: data.user.data,
          token: data.token,
        })
      )

      if (data.user.role === "employee") {
        await fetchMyTasks()
      }

      return true
    } catch (error) {
      return false
    }
  }

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("loggedInUser")
    setUser(null)
    setUserData(null)
    setToken(null)
    setEmployees([])
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        setUserData,
        token,
        login,
        logout,
        employees,
        fetchEmployees,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
