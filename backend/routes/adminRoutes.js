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

// 🔒 PROTECT EVERYTHING BELOW
router.use(protect)
router.use(authorizeRoles("admin"))

// ---------------- EMPLOYEES ----------------
router.get("/employees", getAllEmployees)
router.post("/create-employee", createEmployee)
router.patch("/reset-password", resetEmployeePassword)

// ---------------- TASKS ----------------
router.get("/tasks", getAllTasks)
router.post("/tasks", upload.single("file"), createTask)
router.patch("/tasks/:id/reassign", reassignTask)
router.patch("/tasks/:id/review", reviewTask)
router.delete("/tasks/:id", deleteTask)

// ---------------- MESSAGES ----------------
router.post("/messages", sendMessage)
router.get("/messages", getAdminMessages)

export default router
