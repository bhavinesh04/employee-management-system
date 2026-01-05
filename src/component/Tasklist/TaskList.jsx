import React, { useContext } from "react"
import AcceptTask from "./AcceptTask"
import CompleteTask from "./CompleteTask"
import FailedTask from "./FailedTask"
import { AuthContext } from "../../context/AuthProvider"
import { isOverdue } from "../../utils/taskUtils"


const TaskList = ({ data, filter }) => {
  const { user } = useContext(AuthContext)

  const tasks = data?.tasks || []

  if (tasks.length === 0) {
    return <p className="text-gray-400 mt-5">No tasks assigned</p>
  }

if (filter === "new") {
  tasks = tasks.filter(t => t.newTask)
}
if (filter === "active") {
  tasks = tasks.filter(t => t.active)
}
if (filter === "completed") {
  tasks = tasks.filter(t => t.completed)
}
if (filter === "failed") {
  tasks = tasks.filter(t => t.failed)
}
if (filter === "overdue") {
  tasks = tasks.filter(t => isOverdue(t))
}

  
  return (
    <div className="mt-5">
      {tasks.map((task) => (
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

          {/* 👇 STATUS BASED ACTIONS */}
        
{user === "employee" && task.newTask && (
  <AcceptTask task={task} />
)}
<div>
  {isOverdue(task) && (
  <span className="text-red-400 text-sm font-semibold block mt-1">
    ⏰ Overdue
  </span>
  
)}
</div>

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
