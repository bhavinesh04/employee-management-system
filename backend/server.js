


import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db.js"
connectDB()


import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"

import { protect } from "./middleware/authMiddleware.js"
import adminRoutes from "./routes/adminRoutes.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import path from "path"
import messageRoutes from "./routes/messageRoutes.js"

const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

// test route
app.get("/", (req, res) => {
  res.send("EMS Backend is running 🚀")
})

// protect
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected data accessed",
    user: req.user
  })
})

// Authroutes
app.use("/api/admin", adminRoutes)
app.use("/api/employee", employeeRoutes)

//taskroutes
app.use("/api/tasks", taskRoutes)

//upload files
app.use("/uploads", express.static("uploads"))

//message route
app.use("/api/messages", messageRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})