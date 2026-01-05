import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"
// import { assignTaskApi } from "../../services/taskService"

const CreateTask = ({ onTaskCreated }) => {
  const { token, employees } = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState("")
  const [employeeId, setEmployeeId] = useState("")
const [file, setFile] = useState(null)


  const submitHandler = async (e) => {
    e.preventDefault()

    // ✅ BASIC VALIDATION
    if (!title.trim() || !employeeId) {
      alert("Title and Employee are required")
      return
    }

    try {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("date", date)
    formData.append("category", category)
    formData.append("assignedTo", employeeId)

    if (file) {
      formData.append("file", file)
    }

    await fetch("http://localhost:3000/api/admin/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (onTaskCreated) {
      await onTaskCreated()
    }


      alert("Task assigned successfully")

      // ✅ RESET FORM
      setTitle("")
      setDescription("")
      setDate("")
      setCategory("")
      setEmployeeId("")
    } catch (error) {
      alert("Failed to assign task")
    }
  }

  return (
    <div className="p-5 bg-[#1C1C1C] mt-7 rounded">
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
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
  onChange={e => setFile(e.target.files[0])}
  className="text-gray-300"
/>

        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2 bg-transparent"
        >
          <option value="">Select employee</option>

          {Array.isArray(employees) &&
            employees
              .filter(emp => emp && emp._id) // 🛡️ CRASH-PROOF
              .map(emp => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName}
                </option>
              ))}
        </select>

        <button
          type="submit"
          className="md:col-span-2 bg-emerald-600 py-2 rounded hover:bg-emerald-700 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  )
}

export default CreateTask
