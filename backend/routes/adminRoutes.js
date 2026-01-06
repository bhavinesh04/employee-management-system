import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"
import upload from "../middleware/uploadMiddleware.js"

import {
  sendMessage,
  getAdminMessages,
  getAllEmployees,
  getAllTasks,
  createEmployee,
  resetEmployeePassword,
  reassignTask,
  deleteTask,
  reviewTask,
  createTask,
} from "../controllers/adminController.js"

const router = express.Router()

/* =========================
   🔒 ADMIN AUTH GUARD
   ========================= */
router.use(protect)
router.use(authorizeRoles("admin"))

/* =========================
   👥 EMPLOYEE MANAGEMENT
   ========================= */

// GET /api/admin/employees
router.get("/employees", getAllEmployees)

// POST /api/admin/create-employee
router.post("/create-employee", createEmployee)

// PATCH /api/admin/reset-password
router.patch("/reset-password", resetEmployeePassword)

/* =========================
   📋 TASK MANAGEMENT (ADMIN)
   ========================= */

// GET /api/admin/tasks
router.get("/tasks", getAllTasks)

// POST /api/admin/tasks
router.post("/tasks", upload.single("file"), createTask)

// PATCH /api/admin/tasks/:id/reassign
router.patch("/tasks/:id/reassign", reassignTask)

// PATCH /api/admin/tasks/:id/review
router.patch("/tasks/:id/review", reviewTask)

// DELETE /api/admin/tasks/:id
router.delete("/tasks/:id", deleteTask)

/* =========================
   💬 ADMIN MESSAGES
   ========================= */

// POST /api/admin/messages
router.post("/messages", sendMessage)

// GET /api/admin/messages
router.get("/messages", getAdminMessages)

export default router
