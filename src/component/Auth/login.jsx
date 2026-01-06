import React, { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthProvider"

const Login = () => {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const success = await login(email, password) // ✅ FIX

    if (!success) {
      setError("Invalid credentials")
    }

    setLoading(false)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 border-emerald-600 p-20 rounded-lg">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
            className="text-white outline-none bg-transparent placeholder:text-gray-400 border-2 border-emerald-600 py-4 px-4 text-lg rounded-full w-72"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter your password"
            className="text-white outline-none bg-transparent placeholder:text-gray-400 border-2 border-emerald-600 py-4 px-4 text-lg rounded-full w-72"
          />

          <button
            disabled={loading}
            className={`mt-2 text-white py-3 px-6 text-lg rounded-full transition ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
