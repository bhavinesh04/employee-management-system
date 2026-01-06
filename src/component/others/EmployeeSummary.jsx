import React from "react"

const EmployeeSummary = ({ counts }) => {
  if (!counts || Object.keys(counts).length === 0) {
    return (
      <p className="text-gray-400 mt-5">
        No tasks assigned yet
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Object.entries(counts).map(([name, stat]) => (
        <div
          key={name}
          className="bg-[#1E293B] p-5 rounded-xl border border-gray-700 hover:border-blue-500 transition"
        >
          {/* Employee Name */}
          <h3 className="font-semibold text-lg text-white mb-3">
            {name}
          </h3>

          {/* Task Stats */}
          <div className="text-sm space-y-1">
            <p className="text-blue-400">
              New: <span className="text-white">{stat.newTask}</span>
            </p>

            <p className="text-yellow-400">
              Active: <span className="text-white">{stat.active}</span>
            </p>

            <p className="text-green-400">
              Completed: <span className="text-white">{stat.completed}</span>
            </p>

            <p className="text-red-400">
              Failed: <span className="text-white">{stat.failed}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EmployeeSummary
