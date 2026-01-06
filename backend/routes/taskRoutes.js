import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"
import {
  assignTask,
  getMyTasks,      // ✅ IMPORT THIS
  acceptTask,
  completeTask,
  failTask,
} from "../controllers/taskController.js"
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router()

/* =========================
   👨‍💼 ADMIN – TASK ASSIGNMENT
   ========================= */

// POST /api/tasks/assign
router.post(
  "/assign",
  protect,
  authorizeRoles("admin"),
  assignTask
)

/* =========================
   👨‍💻 EMPLOYEE – TASKS
   ========================= */

// GET /api/tasks/my
router.get(
  "/my",
  protect,
  authorizeRoles("employee"),
  getMyTasks
)

// PATCH /api/tasks/:id/accept
router.patch(
  "/:id/accept",
  protect,
  authorizeRoles("employee"),
  acceptTask
)

// PATCH /api/tasks/:id/complete
router.patch(
  "/:id/complete",
  protect,
  authorizeRoles("employee"),
  upload.single("completedFile"),
  completeTask
)

// PATCH /api/tasks/:id/fail
router.patch(
  "/:id/fail",
  protect,
  authorizeRoles("employee"),
  failTask
)

export default router
