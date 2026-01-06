import React, { useContext } from "react"
import AcceptTask from "../Tasklist/AcceptTask"
import CompleteTask from "../Tasklist/CompleteTask"
import FailedTask from "../Tasklist/FailedTask"
import { AuthContext } from "../../context/AuthProvider"
import { isOverdue } from "../../utils/taskUtils"

// 🔗 Backend base URL for file access
const BASE_URL = import.meta.env.VITE_BASE_URL

const TaskCard = ({ task }) => {
  const { user } = useContext(AuthContext)

  /* =======================
     🏷️ STATUS PRIORITY
     ======================= */
  const statusBadge = () => {
    if (task.completed) {
      return (
        <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">
          Completed
        </span>
      )
    }

    if (task.failed) {
      return (
        <span className="text-xs bg-red-700/20 text-red-400 px-2 py-1 rounded">
          Failed
        </span>
      )
    }

    if (isOverdue(task)) {
      return (
        <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded">
          Overdue
        </span>
      )
    }

    return null
  }

  return (
    <div
      className="
        bg-[#111827]
        border border-gray-800
        rounded-xl
        p-5
        h-[280px]
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-blue-500
        hover:shadow-lg
      "
    >
      {/* =======================
         HEADER
         ======================= */}
      <div className="flex justify-between items-start mb-3 gap-2">
        <h3 className="text-lg font-semibold text-white truncate">
          {task.title}
        </h3>

        {statusBadge()}
      </div>

      <p className="text-gray-300 mb-2 line-clamp-2">
        {task.description || "No description provided"}
      </p>

      {/* =======================
         📎 ADMIN ATTACHED FILE
         ======================= */}
      {task.taskFile && (
        <div className="mt-2">
          <a
            href={`${BASE_URL}${task.taskFile}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              text-sm
              text-blue-400
              hover:underline
            "
          >
            📎 Task Attachment
          </a>
        </div>
      )}

      {/* =======================
         META INFO
         ======================= */}
      <div className="text-sm text-gray-400 space-y-1 mt-2">
        {task.category && <p>📂 Category: {task.category}</p>}
        {task.date && <p>📅 {task.date.slice(0, 10)}</p>}
      </div>

      {/* =======================
         ACTIONS
         ======================= */}
      {user === "employee" && task.newTask && (
        <div className="mt-4">
          <AcceptTask task={task} />
        </div>
      )}

      {user === "employee" && task.active && (
        <div className="mt-4 space-y-2">
          <CompleteTask task={task} />
          <FailedTask task={task} />
        </div>
      )}
    </div>
  )
}

export default TaskCard
