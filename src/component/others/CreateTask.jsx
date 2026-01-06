import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"
import http from "@/services/http"

const CreateTask = ({ onTaskCreated }) => {
  const { token, employees } = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!title.trim() || !employeeId) {
      alert("Title and Employee are required")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("date", date)
      formData.append("category", category)
      formData.append("assignedTo", employeeId)

      if (file) {
        formData.append("file", file) // matches upload.single("file")
      }

      await http.post("/api/admin/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (onTaskCreated) {
        await onTaskCreated()
      }

      // reset form
      setTitle("")
      setDescription("")
      setDate("")
      setCategory("")
      setEmployeeId("")
      setFile(null)

      alert("Task assigned successfully")
    } catch (error) {
      console.error(error)
      alert("Failed to assign task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5 bg-[#1C1C1C] mt-7 rounded-lg">
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 w-full md:col-span-2 bg-transparent"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="border p-2 w-full bg-transparent md:col-span-2"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 bg-transparent"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="border p-2 bg-transparent"
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-gray-300"
        />

        <select
          required
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2 bg-transparent"
        >
          <option value="">Select employee</option>
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
          type="submit"
          disabled={loading}
          className={`md:col-span-2 py-2 rounded transition ${
            loading
              ? "bg-emerald-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  )
}

export default CreateTask
