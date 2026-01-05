import React, { useContext, useEffect, useState } from "react"
import Header from "../others/Header"
import CreateTask from "../others/CreateTask"
import EmployeeSummary from "../others/EmployeeSummary"
import CreateEmployee from "../others/CreateEmployee"
import ResetEmployeePassword from "../others/ResetEmployeePassword"
import AdminTaskHistory from "../others/AdminTaskHistory"
import AdminSidebar from "../admin/AdminSidebar"
import { AuthContext } from "../../context/AuthProvider"
import AdminSendMessage from "../admin/AdminSendMessage"


const AdminDashBoard = ({ changeUser, data }) => {
  const { token } = useContext(AuthContext)

  const [tasks, setTasks] = useState([])
  const [employees, setEmployees] = useState([])
  const [activeTab, setActiveTab] = useState("history")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // ---------------- FETCH TASKS ----------------
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch (err) {
    }
  }

  // ---------------- FETCH EMPLOYEES ----------------
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      setEmployees(Array.isArray(data) ? data : [])
    } catch (err) {
    }
  }
useEffect(() => {
  if (isSidebarOpen && window.innerWidth < 768) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }

  return () => {
    document.body.style.overflow = "auto"
  }
}, [isSidebarOpen])


  useEffect(() => {
    if (token) {
      fetchTasks()
      fetchEmployees()
    }
  }, [token])

  // ---------------- REASSIGN TASK ----------------
  const handleReassign = async (taskId, employeeId) => {
    try {
      await fetch(
        `http://localhost:3000/api/admin/tasks/${taskId}/reassign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ employeeId }),
        }
      )

      fetchTasks()
    } catch (err) {
    }
  }

  const handleDeleteTask = async (taskId) => {
  try {
    await fetch(
      `http://localhost:3000/api/admin/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    fetchTasks()
  } catch (err) {
  }
}


  const handleReviewed = async (taskId) => {
  try {
    await fetch(
      `http://localhost:3000/api/admin/tasks/${taskId}/review`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    fetchTasks()
  } catch (err) {
  }
}


  // ---------------- EMPLOYEE SUMMARY COUNTS ----------------
  const counts = tasks.reduce((acc, task) => {
    if (!task.assignedTo?.firstName) return acc

    const name = task.assignedTo.firstName

    if (!acc[name]) {
      acc[name] = {
        newTask: 0,
        active: 0,
        completed: 0,
        failed: 0,
      }
    }

    if (task.newTask) acc[name].newTask++
    if (task.active) acc[name].active++
    if (task.completed) acc[name].completed++
    if (task.failed) acc[name].failed++

    return acc
  }, {})

  return (
    <div className="min-h-screen bg-[#0B0F1A] ">
      {/* HEADER */}
      <Header changeUser={changeUser} data={data} onMenuClick={() => setIsSidebarOpen(true)} />
{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-30 md:hidden"
    onClick={() => setIsSidebarOpen(false)}
  />
)}

      <div className="flex ">
        {/* SIDEBAR */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
            isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
        />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6">
  

          {activeTab === "employees" && (
            <EmployeeSummary counts={counts} />
          )}

          {activeTab === "tasks" && (
  <div className="max-w-xl">
    <CreateTask onTaskCreated={fetchTasks} />
  </div>
)}


          {activeTab === "history" && (
            <AdminTaskHistory
              tasks={tasks}
              employees={employees}
              onReassign={handleReassign}
              onReviewed={handleReviewed}
              onDelete={handleDeleteTask} 
            />
          )}

          {activeTab === "messages" && (
  <AdminSendMessage employees={employees} />
)}


          {activeTab === "createEmployee" && (
            <div className="max-w-xl">
              <CreateEmployee />
            </div>
          )}

          {activeTab === "resetPassword" && (
            <div className="max-w-xl">
              <ResetEmployeePassword />
            </div>
            
          )}
          </div>
        </div>
      </div>
    
  )
}

export default AdminDashBoard
