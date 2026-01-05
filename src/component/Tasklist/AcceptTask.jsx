import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"
import { acceptTaskApi, getMyTasksApi } from "../../services/taskService"


const AcceptTask = ({ task }) => {
  const { token, setUserData } = useContext(AuthContext)

  // 🛑 SAFETY CHECK (THIS FIXES YOUR CRASH)
  if (!task || !task._id) {
    return null
  }

  const handleAccept = async () => {
    try {
      const updatedTask = await acceptTaskApi(task._id, token)

      const freshTasks = await getMyTasksApi(token)

      setUserData(prev => ({
        ...prev,
        tasks: freshTasks,
      }))

    } catch (err) {
    }
  }

  return (
    <button
      onClick={handleAccept}
      className="bg-blue-500 px-3 py-1 rounded"
    >
      Accept Task
    </button>
  )
}

export default AcceptTask
