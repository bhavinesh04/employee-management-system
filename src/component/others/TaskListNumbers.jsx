import React from "react"

const TaskListNumbers = ({ data }) => {
  const tasks = Array.isArray(data?.tasks) ? data.tasks : []

  const newTask = tasks.filter(t => t.newTask).length
  const active = tasks.filter(t => t.active).length
  const completed = tasks.filter(t => t.completed).length
  const failed = tasks.filter(t => t.failed).length

  const cards = [
    { label: "New Tasks", value: newTask, color: "bg-blue-600" },
    { label: "Active", value: active, color: "bg-yellow-500 text-black" },
    { label: "Completed", value: completed, color: "bg-green-600" },
    { label: "Failed", value: failed, color: "bg-red-600" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {cards.map(card => (
        <div
          key={card.label}
          className={`${card.color} p-4 rounded-xl text-white`}
        >
          <p className="text-sm opacity-90">{card.label}</p>
          <h2 className="text-2xl font-semibold">{card.value}</h2>
        </div>
      ))}
    </div>
  )
}

export default TaskListNumbers
