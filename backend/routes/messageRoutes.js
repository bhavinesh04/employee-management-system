import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
  sendMessage,
  getAdminMessages,
  getEmployeeMessages,
} from "../controllers/messageController.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

/* =========================
   👨‍💼 ADMIN
   ========================= */

// admin send message
router.post(
  "/admin",
  protect,
  authorizeRoles("admin"),
  sendMessage
)

// admin get sent messages
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  getAdminMessages
)

/* =========================
   👨‍💻 EMPLOYEE
   ========================= */

// employee fetch messages
router.get(
  "/employee",
  protect,
  authorizeRoles("employee"),
  getEmployeeMessages
)

export default router
