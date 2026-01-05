import React from "react"

const EmployeeSummary = ({ counts }) => {
  if (!counts || Object.keys(counts).length === 0) {
    return <p className="text-gray-400 mt-5">No tasks assigned yet</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(counts).map(([name, stat]) => (
        <div key={name} className="bg-[#1E293B] p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2 text-lg">{name}</h3>

          <div className="text-sm space-y-1">
          <p>New: {stat.newTask}</p>
          <p>Active: {stat.active}</p>
          <p>Completed: {stat.completed}</p>
          <p>Failed: {stat.failed}</p>
        </div>
        </div>
      ))}
    </div>
  )
}

export default EmployeeSummary
