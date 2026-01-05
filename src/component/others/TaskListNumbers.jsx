import React from 'react'

const TaskListNumbers = ({ data }) => {
  const tasks = data?.tasks || []

  const newTask = tasks.filter(t => t.newTask).length
  const active = tasks.filter(t => t.active).length
  const completed = tasks.filter(t => t.completed).length
  const failed = tasks.filter(t => t.failed).length

  return (
    <div className="flex gap-5 mt-5">
      <div className="bg-blue-500 p-4 rounded">
        <h2>New Task</h2>
        <p>{newTask}</p>
      </div>

      <div className="bg-yellow-500 p-4 rounded">
        <h2>Active</h2>
        <p>{active}</p>
      </div>

      <div className="bg-green-500 p-4 rounded">
        <h2>Completed</h2>
        <p>{completed}</p>
      </div>

      <div className="bg-red-500 p-4 rounded">
        <h2>Failed</h2>
        <p>{failed}</p>
      </div>
    </div>
  )
}

export default TaskListNumbers
