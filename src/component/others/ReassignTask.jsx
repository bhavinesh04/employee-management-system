import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { reassignTaskApi } from "../../services/taskService"

const ReassignTask = ({ task, setTasks }) => {
  const { token, employees } = useContext(AuthContext)
  const [employeeId, setEmployeeId] = useState("")
  const [loading, setLoading] = useState(false)

  if (!task || !task._id) return null

  const handleReassign = async () => {
    if (!employeeId) {
      alert("Select an employee")
      return
    }

    try {
      setLoading(true)

      const updatedTask = await reassignTaskApi(
        task._id,
        employeeId,
        token
      )

      // ✅ UPDATE ONLY THIS TASK (NO REFRESH)
      setTasks(prev =>
        prev.map(t =>
          t._id === updatedTask._id ? updatedTask : t
        )
      )

      setEmployeeId("")
    } catch (err) {
      alert("Failed to reassign task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2 items-center mt-2">
      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="border px-2 py-1 bg-transparent text-sm"
      >
        <option value="">Reassign to</option>

        {Array.isArray(employees) &&
          employees
            .filter(emp => emp && emp._id)
            .map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName}
              </option>
            ))}
      </select>

      <button
        onClick={handleReassign}
        disabled={loading}
        className="bg-yellow-500 px-3 py-1 rounded text-black text-sm"
      >
        {loading ? "Reassigning..." : "Reassign"}
      </button>
    </div>
  )
}

export default ReassignTask
