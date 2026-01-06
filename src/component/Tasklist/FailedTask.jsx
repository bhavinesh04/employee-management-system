import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { failTaskApi, getMyTasksApi } from "../../services/taskService"

const FailedTask = ({ task }) => {
  const { token, setUserData } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  if (!task?._id) return null

  const handleFail = async () => {
    try {
      setLoading(true)

      await failTaskApi(task._id, token)

      // 🔄 Always refetch fresh tasks
      const freshTasks = await getMyTasksApi(token)

      setUserData(prev => ({
        ...prev,
        tasks: freshTasks,
      }))
    } catch (err) {
      console.error(err)
      alert("Failed to mark task as failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleFail}
      disabled={loading}
      className={`
        px-4 py-2 rounded-md text-sm transition
        ${
          loading
            ? "bg-red-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }
        text-white
      `}
    >
      {loading ? "Updating..." : "❌ Mark as Failed"}
    </button>
  )
}

export default FailedTask
