import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"

const ResetEmployeePassword = () => {
  const { token, employees } = useContext(AuthContext)

  const [employeeId, setEmployeeId] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    if (!employeeId || !newPassword) {
      alert("Select employee and enter password")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        `http://localhost:3000/api/admin/reset-password/${employeeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: newPassword }),
        }
      )

      if (!res.ok) {
        throw new Error("Reset failed")
      }

      alert("Password reset successfully")
      setEmployeeId("")
      setNewPassword("")
    } catch (err) {
      alert("Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1E293B] p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Reset Employee Password</h2>

      <select
        className="w-full p-2 bg-transparent border rounded mb-3"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.firstName}
          </option>
        ))}
      </select>

      <input
        type="password"
        className="w-full p-2 bg-transparent border rounded mb-3"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        disabled={loading}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  )
}

export default ResetEmployeePassword
