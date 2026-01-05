import express from "express"
import { getEmployeeMessages } from "../controllers/messageController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

// Employee fetch messages
router.get("/employee", protect, getEmployeeMessages)

export default router
