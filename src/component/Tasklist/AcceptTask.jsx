import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { acceptTaskApi, getMyTasksApi } from "../../services/taskService"

const AcceptTask = ({ task }) => {
  const { token, setUserData } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  // 🛡️ Safety check
  if (!task?._id) return null

  const handleAccept = async () => {
    try {
      setLoading(true)

      await acceptTaskApi(task._id, token)

      // Always fetch fresh tasks from backend
      const freshTasks = await getMyTasksApi(token)

      setUserData(prev => ({
        ...prev,
        tasks: freshTasks,
      }))
    } catch (err) {
      console.error(err)
      alert("Failed to accept task. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleAccept}
      disabled={loading}
      className={`
        px-3 py-1 rounded text-sm transition
        ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }
        text-white
      `}
    >
      {loading ? "Accepting..." : "Accept Task"}
    </button>
  )
}

export default AcceptTask
