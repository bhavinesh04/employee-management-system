import { createContext, useState, useEffect } from "react"
import http from "@/services/http"

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

  // ✅ Fetch employees (ADMIN ONLY)
  const fetchEmployees = async () => {
    try {
      const res = await http.get("/api/admin/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setEmployees(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      setEmployees([])
    }
  }

  // ✅ Auto fetch employees when admin logs in
  useEffect(() => {
    if (!token || user !== "admin") return
    fetchEmployees()
  }, [token, user])

  // ✅ Fetch employee tasks
  const fetchMyTasks = async () => {
    if (!token) return
    try {
      const res = await http.get("/api/employee/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserData(prev => ({
        ...prev,
        tasks: Array.isArray(res.data) ? res.data : [],
      }))
    } catch (error) {
      console.error(error)
    }
  }

  // ✅ Login (FIXED)
  const login = async (email, password) => {
    try {
      const res = await http.post("/api/auth/login", {
        email,
        password,
      })

      const data = res.data

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
