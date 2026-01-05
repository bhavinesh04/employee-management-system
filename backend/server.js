import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"

import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import { protect } from "./middleware/authMiddleware.js"

// 🔌 Connect Database
connectDB()

const app = express()

// 🔧 Middleware
app.use(cors())
app.use(express.json())

// 🔐 Auth Routes
app.use("/api/auth", authRoutes)

// ✅ Health Check Route (IMPORTANT FOR DEPLOYMENT)
app.get("/", (req, res) => {
  res.send("EMS Backend is running 🚀")
})

// 🔒 Protected Test Route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user,
  })
})

// 👑 Admin Routes
app.use("/api/admin", adminRoutes)

// 👷 Employee Routes
app.use("/api/employee", employeeRoutes)

// 📋 Task Routes
app.use("/api/tasks", taskRoutes)

// 💬 Message Routes
app.use("/api/messages", messageRoutes)

// 📁 File Uploads (Multer)
app.use("/uploads", express.static("uploads"))

// 🚀 Server Start
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
