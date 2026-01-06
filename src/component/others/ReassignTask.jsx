import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { reassignTaskApi } from "../../services/taskService"

const ReassignTask = ({ task, setTasks }) => {
  const { token, employees } = useContext(AuthContext)
  const [employeeId, setEmployeeId] = useState("")
  const [loading, setLoading] = useState(false)

  if (!task?._id) return null

  const handleReassign = async () => {
    if (!employeeId) {
      alert("Please select an employee")
      return
    }

    if (employeeId === task.assignedTo?._id) {
      alert("Task is already assigned to this employee")
      return
    }

    try {
      setLoading(true)

      const updatedTask = await reassignTaskApi(
        task._id,
        employeeId,
        token
      )

      // ✅ Update only affected task (optimistic UI)
      setTasks(prev =>
        prev.map(t =>
          t._id === updatedTask._id ? updatedTask : t
        )
      )

      setEmployeeId("")
    } catch (err) {
      console.error(err)
      alert("Failed to reassign task. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2 items-center mt-3">
      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="
          border border-gray-700
          px-2 py-1
          bg-transparent
          text-sm
          rounded
          text-gray-200
        "
      >
        <option value="">Reassign to…</option>

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
        className={`
          px-3 py-1 rounded text-sm transition
          ${
            loading
              ? "bg-yellow-400 cursor-not-allowed text-black"
              : "bg-yellow-500 hover:bg-yellow-600 text-black"
          }
        `}
      >
        {loading ? "Reassigning..." : "Reassign"}
      </button>
    </div>
  )
}

export default ReassignTask
