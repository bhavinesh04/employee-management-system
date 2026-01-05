import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"
import { getMyTasks } from "../controllers/taskController.js"


const router = express.Router()

router.use(protect, authorizeRoles("employee"))

router.get("/tasks", getMyTasks)

export default router