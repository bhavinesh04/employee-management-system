import React, { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthProvider"
import http from "@/services/http"
import { getMyTasksApi } from "../../services/taskService"

const CompleteTask = ({ task }) => {
  const { token, setUserData } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!task?._id) return null

  const handleComplete = async () => {
    if (!file) {
      alert("Please upload a proof file")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("completedFile", file)

      await http.patch(
        `/api/tasks/${task._id}/complete`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // 🔄 Always refetch fresh tasks
      const freshTasks = await getMyTasksApi(token)

      setUserData(prev => ({
        ...prev,
        tasks: freshTasks,
      }))

      setFile(null)
    } catch (err) {
      console.error(err)
      alert("Failed to complete task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-3 space-y-2">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm text-gray-300"
      />

      <button
        onClick={handleComplete}
        disabled={loading}
        className={`
          px-4 py-2 rounded transition text-white
          ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }
        `}
      >
        {loading ? "Submitting..." : "✅ Mark as Completed"}
      </button>
    </div>
  )
}

export default CompleteTask
