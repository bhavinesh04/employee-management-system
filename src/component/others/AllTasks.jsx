import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTasks = () => {
  const { employees, setEmployees } = useContext(AuthContext)

  const acceptTask = (employeeName, taskIndex) => {
    const updatedEmployees = employees.map(emp => {
      if (emp.firstName === employeeName) {
        const updatedTasks = [...emp.tasks]
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          active: true,
          newTask: false
        }

        return {
          ...emp,
          tasks: updatedTasks,
          taskNumbers: {
            ...emp.taskNumbers,
            newTask: emp.taskNumbers.newTask - 1,
            active: emp.taskNumbers.active + 1
          }
        }
      }
      return emp
    })

    setEmployees(updatedEmployees)
  }

  if (!employees || employees.length === 0) {
    return <p className="text-gray-400">No employees found</p>
  }

  return (
    <div className="bg-[#1C1C1C] p-5 rounded mt-5">
      <div className="bg-red-400 py-2 mb-2 px-4 flex justify-between rounded">
        <h2 className="w-1/5">Employee</h2>
        <h3 className="w-1/5">New</h3>
        <h5 className="w-1/5">Active</h5>
        <h5 className="w-1/5">Completed</h5>
        <h5 className="w-1/5">Failed</h5>
      </div>

      {employees.map((e, idx) => (
        <div key={idx} className="border-2 border-emerald-500 p-4 mb-4 rounded">
          <div className="flex justify-between">
            <h2 className="w-1/5">{e.firstName}</h2>
            <h3 className="w-1/5 text-blue-600">{e.taskNumbers.newTask}</h3>
            <h5 className="w-1/5 text-yellow-400">{e.taskNumbers.active}</h5>
            <h5 className="w-1/5 text-green-400">{e.taskNumbers.completed}</h5>
            <h5 className="w-1/5 text-red-600">{e.taskNumbers.failed}</h5>
          </div>

          <div className="mt-3">
            {e.tasks.map((task, tIdx) => (
              <div
                key={tIdx}
                className="border border-gray-500 p-2 my-2 flex justify-between rounded"
              >
                <div>
                  <h4 className="font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-300">{task.description}</p>
                </div>

                {task.newTask && !task.active && (
                  <button
                    className="bg-blue-500 px-3 py-1 rounded"
                    onClick={() => acceptTask(e.firstName, tIdx)}
                  >
                    Accept Task
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllTasks
