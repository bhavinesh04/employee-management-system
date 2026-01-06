import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import path from "path"

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

/* =========================
   🔧 GLOBAL MIDDLEWARE
   ========================= */

// CORS (safe default – frontend friendly)
app.use(
  cors({
    origin: "*", // 🔁 later you can restrict to frontend URL
    credentials: true,
  })
)

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

/* =========================
   📁 STATIC FILES (UPLOADS)
   ========================= */

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))

/* =========================
   🔐 AUTH ROUTES
   ========================= */

app.use("/api/auth", authRoutes)

/* =========================
   🩺 HEALTH CHECK
   ========================= */

app.get("/", (req, res) => {
  res.status(200).send("EMS Backend is running 🚀")
})

/* =========================
   🔒 TEST PROTECTED ROUTE
   ========================= */

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user,
  })
})

/* =========================
   👑 ADMIN ROUTES
   ========================= */

app.use("/api/admin", adminRoutes)

/* =========================
   👷 EMPLOYEE ROUTES
   ========================= */

app.use("/api/employee", employeeRoutes)

/* =========================
   📋 TASK ROUTES (ADMIN ONLY)
   ========================= */

app.use("/api/tasks", taskRoutes)

/* =========================
   💬 MESSAGE ROUTES
   ========================= */

app.use("/api/messages", messageRoutes)

/* =========================
   ❌ 404 HANDLER
   ========================= */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

/* =========================
   🚀 START SERVER
   ========================= */

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
