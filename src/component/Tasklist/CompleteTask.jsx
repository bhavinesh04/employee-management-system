import React, { useState, useContext } from "react"

import { AuthContext } from "../../context/AuthProvider"
import { completeTaskApi } from "../../services/taskService"

const CompleteTask = ({ task }) => {
  const { token, setUserData } = useContext(AuthContext)
   const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!task) return null

  const handleComplete = async () => {
     if (!file) {
      alert("Please upload proof file")
      return
    }
 const formData = new FormData()
    formData.append("completedFile", file)

    setLoading(true)

    try {
      const res = await fetch(
        `${BASE_URL}
/api/tasks/${task._id}/complete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      )

    
      const updatedTask = await completeTaskApi(task._id, token)

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
    <div className="mt-3 space-y-2">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm"
      />

    <button
      onClick={handleComplete}
      className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
    >
      ✅ Mark as Completed
    </button>
    </div>
  )
}

export default CompleteTask
