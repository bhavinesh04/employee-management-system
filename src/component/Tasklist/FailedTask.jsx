import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { failTaskApi } from "../../services/taskService"

const FailedTask = ({ task }) => {
  const { token, setUserData } = useContext(AuthContext)

  if (!task) return null

  const handleFail = async () => {
    try {
      const updatedTask = await failTaskApi(task._id, token)

      setUserData(prev => ({
        ...prev,
        tasks: prev.tasks.map(t =>
          t._id === updatedTask._id ? updatedTask : t
        )
      }))
    } catch (err) {
    }
  }

  return (
    <button
      onClick={handleFail}
      className="
        px-4 py-2
        rounded-md
        border border-red-600
        text-white-500
        bg-red-500
        text-sm
        hover:bg-red-600 hover:text-white
        transition
      "
    >
      ❌ Mark as Failed
    </button>
  )
}

export default FailedTask
