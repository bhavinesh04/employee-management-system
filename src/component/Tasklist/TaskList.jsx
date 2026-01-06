import React, { useContext } from "react"
import AcceptTask from "./AcceptTask"
import CompleteTask from "./CompleteTask"
import FailedTask from "./FailedTask"
import { AuthContext } from "../../context/AuthProvider"
import { isOverdue } from "../../utils/taskUtils"

const TaskList = ({ data, filter }) => {
  const { user } = useContext(AuthContext)

  const tasks = data?.tasks || []

  // ✅ derive a new array (do NOT reassign const)
  let filteredTasks = tasks

  if (filter === "new") {
    filteredTasks = tasks.filter(t => t.newTask)
  }

  if (filter === "active") {
    filteredTasks = tasks.filter(t => t.active)
  }

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed)
  }

  if (filter === "failed") {
    filteredTasks = tasks.filter(t => t.failed)
  }

  if (filter === "overdue") {
    filteredTasks = tasks.filter(t => isOverdue(t))
  }

  if (filteredTasks.length === 0) {
    return (
      <p className="text-gray-400 mt-5">
        No tasks assigned
      </p>
    )
  }

  return (
    <div className="mt-5 space-y-4">
      {filteredTasks.map(task => (
        <div
          key={task._id}
          className={`p-4 rounded ${
            isOverdue(task)
              ? "bg-red-900/30 border border-red-500"
              : "bg-gray-800"
          }`}
        >
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-400">{task.category}</p>
          <p className="text-sm">
            {task.date ? task.date.slice(0, 10) : ""}
          </p>

          {/* STATUS & ACTIONS */}
          {user === "employee" && task.newTask && (
            <AcceptTask task={task} />
          )}

          {isOverdue(task) && (
            <span className="text-red-400 text-sm font-semibold block mt-1">
              ⏰ Overdue
            </span>
          )}

          {user === "employee" && task.active && (
            <>
              <CompleteTask task={task} />
              <FailedTask task={task} />
            </>
          )}

          {task.completed && (
            <p className="text-green-400 font-semibold mt-2">
              ✅ Task Completed
            </p>
          )}

          {task.failed && (
            <p className="text-red-400 font-semibold mt-2">
              ❌ Task Failed
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default TaskList
