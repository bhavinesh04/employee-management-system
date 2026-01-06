import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"
import http from "@/services/http"

const ResetEmployeePassword = () => {
  const { token, employees } = useContext(AuthContext)

  const [employeeId, setEmployeeId] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    if (!employeeId || !newPassword) {
      alert("Please select an employee and enter a new password")
      return
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }

    try {
      setLoading(true)

      await http.patch(
        "/api/admin/reset-password",
        {
          employeeId,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      alert("Password reset successfully")

      setEmployeeId("")
      setNewPassword("")
    } catch (err) {
      console.error(err)
      alert("Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1E293B] p-5 rounded-lg max-w-md">
      <h2 className="text-lg font-semibold text-white mb-4">
        Reset Employee Password
      </h2>

      <select
        className="w-full p-2 bg-transparent border border-gray-700 rounded mb-3 text-gray-200"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      >
        <option value="">Select Employee</option>
        {Array.isArray(employees) &&
          employees.map(emp => (
            <option key={emp._id} value={emp._id}>
              {emp.firstName}
            </option>
          ))}
      </select>

      <input
        type="password"
        className="w-full p-2 bg-transparent border border-gray-700 rounded mb-3 text-gray-200"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        disabled={loading}
        className={`
          w-full py-2 rounded transition
          ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
          text-white
        `}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  )
}

export default ResetEmployeePassword
