import React, { useContext, useEffect, useMemo, useState } from "react"
import Header from "../others/Header"
import CreateTask from "../others/CreateTask"
import EmployeeSummary from "../others/EmployeeSummary"
import CreateEmployee from "../others/CreateEmployee"
import ResetEmployeePassword from "../others/ResetEmployeePassword"
import AdminTaskHistory from "../others/AdminTaskHistory"
import AdminSidebar from "../admin/AdminSidebar"
import AdminSendMessage from "../admin/AdminSendMessage"
import { AuthContext } from "../../context/AuthProvider"
import http from "@/services/http"

const AdminDashBoard = ({ changeUser }) => {
  const { token, userData } = useContext(AuthContext)


  const [tasks, setTasks] = useState([])
  const [employees, setEmployees] = useState([])
  const [activeTab, setActiveTab] = useState("history")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  /* =========================
     📋 FETCH TASKS
     ========================= */

  const fetchTasks = async () => {
    if (!token) return
    try {
      const res = await http.get("/api/admin/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error("Failed to fetch tasks", err)
    }
  }

  /* =========================
     👷 FETCH EMPLOYEES
     ========================= */

  const fetchEmployees = async () => {
    if (!token) return
    try {
      const res = await http.get("/api/admin/employees", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setEmployees(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error("Failed to fetch employees", err)
    }
  }

  /* =========================
     📱 SIDEBAR SCROLL LOCK
     ========================= */

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

  /* =========================
     🚀 INITIAL LOAD
     ========================= */

  useEffect(() => {
    fetchTasks()
    fetchEmployees()
  }, [token])

  /* =========================
     🔁 TASK ACTIONS
     ========================= */

  const handleReassign = async (taskId, employeeId) => {
    try {
      await http.put(
        `/api/admin/tasks/${taskId}/reassign`,
        { employeeId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchTasks()
    } catch (err) {
      console.error("Failed to reassign task", err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await http.delete(`/api/admin/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchTasks()
    } catch (err) {
      console.error("Failed to delete task", err)
    }
  }

  const handleReviewed = async (taskId) => {
    try {
      await http.patch(
        `/api/admin/tasks/${taskId}/review`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchTasks()
    } catch (err) {
      console.error("Failed to review task", err)
    }
  }

  /* =========================
     📊 EMPLOYEE SUMMARY
     ========================= */

  const counts = useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (!task.assignedTo?.firstName) return acc

      const name = task.assignedTo.firstName

      if (!acc[name]) {
        acc[name] = { newTask: 0, active: 0, completed: 0, failed: 0 }
      }

      if (task.newTask) acc[name].newTask++
      if (task.active) acc[name].active++
      if (task.completed) acc[name].completed++
      if (task.failed) acc[name].failed++

      return acc
    }, {})
  }, [tasks])

  /* =========================
     🧱 UI
     ========================= */

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <Header
  changeUser={changeUser}
  data={userData}
  onMenuClick={() => setIsSidebarOpen(true)}
/>


      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

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
