import React, { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"

const CreateEmployee = () => {
  const { token } = useContext(AuthContext)

  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName || !email || !password) {
      alert("All fields are required")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        "${BASE_URL}
/api/admin/create-employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ firstName, email, password }),
        }
      )

      if (!res.ok) {
        throw new Error("Failed to create employee")
      }

      alert("Employee created successfully")

      setFirstName("")
      setEmail("")
      setPassword("")
    } catch (err) {
      alert("Error creating employee")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1E293B] p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Create Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 bg-transparent border rounded"
          placeholder="Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="w-full p-2 bg-transparent border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 bg-transparent border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Employee"}
        </button>
      </form>
    </div>
  )
}

export default CreateEmployee
