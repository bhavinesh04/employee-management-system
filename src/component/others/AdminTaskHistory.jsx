import React, { useState } from "react"
import { isOverdue } from "../../utils/taskUtils"

// 🔗 Backend base URL (for files)
const BASE_URL = import.meta.env.VITE_BASE_URL

const statusStyles = {
  newTask: "bg-blue-600/20 text-blue-400",
  active: "bg-yellow-500/20 text-yellow-400",
  completed: "bg-green-600/20 text-green-400",
  failed: "bg-red-600/20 text-red-400",
}

const overdueCardStyle =
  "border-red-600 shadow-[0_0_0_1px_rgba(220,38,38,0.6)]"

const getStatus = task => {
  if (task.reviewed) {
    return {
      label: "Reviewed",
      style: "bg-green-700/30 text-green-300",
    }
  }
  if (task.completed) {
    return { label: "Completed", style: statusStyles.completed }
  }
  if (task.failed) {
    return { label: "Failed", style: statusStyles.failed }
  }
  if (isOverdue(task)) {
    return { label: "Overdue", style: "bg-red-600/30 text-red-400" }
  }
  if (task.active) {
    return { label: "Active", style: statusStyles.active }
  }
  return { label: "New", style: statusStyles.newTask }
}

const AdminTaskHistory = ({
  tasks,
  employees,
  onReassign,
  onReviewed,
  onDelete,
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("")
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("")
  const [showEmployees, setShowEmployees] = useState(false)

  const filteredTasks = selectedEmployeeId
    ? tasks.filter(t => t.assignedTo?._id === selectedEmployeeId)
    : []

  return (
    <div>
      {/* 🔝 HEADER + SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white">
          {selectedEmployeeId
            ? `Task History – ${selectedEmployeeName}`
            : "Select an employee to view task history"}
        </h2>

        {/* DESKTOP DROPDOWN */}
        <div className="hidden md:block w-64">
          <select
            value={selectedEmployeeId}
            onChange={e => {
              const emp = employees.find(x => x._id === e.target.value)
              setSelectedEmployeeId(e.target.value)
              setSelectedEmployeeName(emp?.firstName || "")
            }}
            className="w-full bg-[#0F172A] border border-gray-700 text-gray-200 rounded-lg px-4 py-2"
          >
            <option value="">Select employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.firstName}
              </option>
            ))}
          </select>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setShowEmployees(!showEmployees)}
          className="md:hidden bg-[#0F172A] border border-gray-800 text-white px-4 py-2 rounded-lg"
        >
          {showEmployees ? "Hide Employees" : "Select Employee"}
        </button>
      </div>

      {/* 📱 MOBILE EMPLOYEE LIST */}
      {showEmployees && (
        <div className="md:hidden mb-6 bg-[#0F172A] border border-gray-800 rounded-xl p-4 space-y-2">
          {employees.map(emp => (
            <button
              key={emp._id}
              onClick={() => {
                setSelectedEmployeeId(emp._id)
                setSelectedEmployeeName(emp.firstName)
                setShowEmployees(false)
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition
                ${
                  selectedEmployeeId === emp._id
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
            >
              {emp.firstName}
            </button>
          ))}
        </div>
      )}

      {/* 🧱 TASK GRID */}
      {!selectedEmployeeId ? (
        <p className="text-gray-400">No employee selected</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-400">No tasks for this employee</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => {
            const status = getStatus(task)

            return (
              <div
                key={task._id}
                className={`bg-[#111827] border rounded-xl p-5
                  ${isOverdue(task) ? overdueCardStyle : "border-gray-800"}`}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {task.title}
                </h3>

                <div className="text-sm text-gray-400 space-y-1 mb-3">
                  <p>👤 {task.assignedTo?.firstName}</p>
                  {task.date && <p>📅 {task.date.slice(0, 10)}</p>}
                </div>

                <span
                  className={`inline-block text-xs px-3 py-1 rounded-full mb-3 ${status.style}`}
                >
                  {status.label}
                </span>

                {/* 📎 COMPLETED FILE */}
                {task.completedFile && (
                  <a
                    href={`${BASE_URL}${task.completedFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-400 hover:underline mb-2"
                  >
                    📎 Employee Submission
                  </a>
                )}

                {task.completed && !task.reviewed && (
                  <button
                    onClick={() => onReviewed(task._id)}
                    className="w-full mt-2 bg-green-600/20 text-green-400 border border-green-600/40 rounded py-1.5"
                  >
                    Mark as Reviewed
                  </button>
                )}

                <button
                  onClick={() => onDelete(task._id)}
                  className="w-full mt-2 bg-yellow-600/20 text-yellow-400 border border-yellow-600/40 rounded py-1.5"
                >
                  Delete Task
                </button>

                {task.failed && (
                  <select
                    className="w-full mt-2 bg-[#0F172A] border border-gray-700 text-gray-200 rounded px-3 py-2 text-sm"
                    defaultValue=""
                    onChange={e =>
                      onReassign(task._id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Reassign to...
                    </option>
                    {employees.map(emp => (
                      <option key={emp._id} value={emp._id}>
                        {emp.firstName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AdminTaskHistory
