import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"
import { assignTask, getMyTasks, acceptTask ,completeTask, failTask} from "../controllers/taskController.js"
import upload from "../middleware/uploadMiddleware.js"


const router = express.Router()

router.post("/assign", protect, authorizeRoles("admin"), assignTask)
router.get("/my", protect, authorizeRoles("employee"), getMyTasks)
router.patch("/:id/accept", protect, authorizeRoles("employee"), acceptTask)
router.patch("/:id/fail", protect, failTask)
router.patch(
  "/:id/complete",
  protect,
  upload.single("completedFile"),
  completeTask
)


export default router
