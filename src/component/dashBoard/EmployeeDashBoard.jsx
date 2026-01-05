import React, { useContext, useEffect, useState } from "react"
import Header from "../others/Header"
import EmployeeSidebar from "../employee/EmployeeSidebar"
import TaskCard from "../employee/TaskCard"
import { AuthContext } from "../../context/AuthProvider"
import { getMyTasksApi } from "../../services/taskService"
import { getEmployeeMessagesApi } from "../../services/messageService"
import { isOverdue } from "../../utils/taskUtils"


const EmployeeDashBoard = ({ changeUser }) => {
  const { token, userData, setUserData } = useContext(AuthContext)

  const [activeTab, setActiveTab] = useState("new")
  const [messages, setMessages] = useState([])

  /* =======================
     FETCH EMPLOYEE MESSAGES
     ======================= */
  useEffect(() => {
    if (!token) return

    const fetchMessages = async () => {
      try {
        const data = await getEmployeeMessagesApi(token)
        setMessages(data)
      } catch (_) {
        // intentionally silent (presentation clean)
      }
    }

    fetchMessages()
  }, [token])

  /* =======================
     FETCH EMPLOYEE TASKS
     ======================= */
  useEffect(() => {
    if (!token) return

    const fetchTasks = async () => {
      try {
        const tasks = await getMyTasksApi(token)
        setUserData(prev => ({ ...prev, tasks }))
      } catch (_) {
        // intentionally silent
      }
    }

    fetchTasks()
  }, [token, setUserData])

  if (!userData) {
    return <p className="text-gray-400 p-4">Loading...</p>
  }

  const tasks = userData.tasks || []

  /* =======================
     TASK COUNTS (SIDEBAR)
     ======================= */
  const counts = {
    new: tasks.filter(t => t.newTask).length,
    overdue: tasks.filter(t => isOverdue(t)).length,
    active: tasks.filter(t => t.active && !isOverdue(t)).length,
    completed: tasks.filter(t => t.completed).length,
    failed: tasks.filter(t => t.failed).length,
  }

  /* =======================
     FILTERED TASKS
     ======================= */
  const filteredTasks = tasks.filter(task => {
    if (activeTab === "new") return task.newTask
    if (activeTab === "overdue") return isOverdue(task)
    if (activeTab === "active") return task.active && !isOverdue(task)
    if (activeTab === "completed") return task.completed
    if (activeTab === "failed") return task.failed
    return false
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Header changeUser={changeUser} data={userData} onMenuClick={() => setIsSidebarOpen(true)}/>

{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-30 md:hidden"
    onClick={() => setIsSidebarOpen(false)}
  />
)}

      <div className="flex">
        <EmployeeSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={counts}
            isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">

          {/* =======================
             📨 MESSAGES TAB
             ======================= */}
          {activeTab === "messages" && (
            <div>
              <h2 className="text-xl text-white mb-4">Messages</h2>

              {messages.length === 0 ? (
                <p className="text-gray-400">No messages</p>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg._id}
                    className="mb-4 p-4 rounded-lg bg-[#141A2A] border-l-4 border-indigo-500"
                  >
                    <p className="text-sm text-gray-400">
                      <strong className="text-white">From:</strong>{" "}
                      {msg.sender?.name || "Admin"}
                    </p>

                    <div className="text-white mt-1 break-words">
                      {msg.content}
                    </div>

                    <small className="text-gray-500">
                      {new Date(msg.createdAt).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          )}

          {/* =======================
             📋 TASKS TAB
             ======================= */}
          {activeTab !== "messages" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredTasks.length ? (
                filteredTasks.map(task => (
                  <TaskCard key={task._id} task={task} />
                ))
              ) : (
                <p className="text-gray-400 col-span-full">
                  No tasks in this section
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default EmployeeDashBoard
