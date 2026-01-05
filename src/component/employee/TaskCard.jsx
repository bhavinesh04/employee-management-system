import React, { useContext } from "react"
import AcceptTask from "../Tasklist/AcceptTask"
import CompleteTask from "../Tasklist/CompleteTask"
import FailedTask from "../Tasklist/FailedTask"
import { AuthContext } from "../../context/AuthProvider"
import { isOverdue } from "../../utils/taskUtils"

const TaskCard = ({ task }) => {
  const { user } = useContext(AuthContext)

  return (
    <div className="
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
    ">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white">
          {task.title}
        </h3>

        {isOverdue(task) && (
          <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded">
            Overdue
          </span>
        )}

        {task.completed && (
          <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded">
            Completed
          </span>
        )}

        {task.failed && (
          <span className="text-xs bg-red-700/20 text-red-400 px-2 py-1 rounded">
            Failed
          </span>
        )}
      </div>

      <p className="text-gray-300 mb-2 line-clamp-2">
        {task.description}
      </p>

      {/* 📎 ADMIN ATTACHED FILE */}
{task.taskFile && (
  <div className="mt-2">
    <a
      href={`http://localhost:3000${task.taskFile}`}
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


      <div className="text-sm text-gray-400 space-y-1">
        <p>📂 {task.category}category: </p>
        {task.date && <p>📅 {task.date.slice(0, 10)}</p>}
      </div>

      {/* Actions */}
      {user === "employee" && task.newTask && (
        <div className="mt-4">
          <AcceptTask task={task} />
        </div>
      )}


      {user === "employee" && task.active && (
        <div className="gap-2 mt-2">
          <CompleteTask task={task} />
          <div className="mt-2">
          <FailedTask task={task} />
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskCard
