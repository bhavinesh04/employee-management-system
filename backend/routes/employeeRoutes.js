import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"
import {
  getMyTasks,
  acceptTask,
  completeTask,
  failTask,
} from "../controllers/taskController.js"
import {
  getEmployeeMessages,
} from "../controllers/messageController.js"
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router()

// 🔐 Protect all employee routes
router.use(protect, authorizeRoles("employee"))

/* =========================
   📌 TASK ROUTES (EMPLOYEE)
   ========================= */

// Get logged-in employee's tasks
// GET /api/employee/tasks
router.get("/tasks", getMyTasks)

// Accept a task
// PATCH /api/employee/tasks/:id/accept
router.patch("/tasks/:id/accept", acceptTask)

// Mark task as completed (with optional file upload)
// PATCH /api/employee/tasks/:id/complete
router.patch(
  "/tasks/:id/complete",
  upload.single("completedFile"),
  completeTask
)

// Mark task as failed
// PATCH /api/employee/tasks/:id/fail
router.patch("/tasks/:id/fail", failTask)

/* =========================
   💬 MESSAGE ROUTES (EMPLOYEE)
   ========================= */

// Get messages sent to employee (or broadcast messages)
// GET /api/employee/messages
router.get("/messages", getEmployeeMessages)

export default router
