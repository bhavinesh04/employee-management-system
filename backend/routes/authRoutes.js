console.log("✅ authRoutes.js LOADED")

import express from "express"
import { loginUser } from "../controllers/authController.js"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

const router = express.Router()

router.post("/seed", async (req, res) => {
  try {
    // Clear old users (optional but clean)
    await User.deleteMany()

    const adminPassword = await bcrypt.hash("123", 10)
    const employeePassword = await bcrypt.hash("123", 10)

    await User.insertMany([
      {
        firstName: "Dileep",
        email: "admin@example.com",
        password: adminPassword,
        role: "admin",
      },
      {
        firstName: "Arjun",
        email: "arjun@example.com",
        password: employeePassword,
        role: "employee",
      },
    ])

    return res.status(201).json({
      success: true,
      message: "Users seeded successfully",
    })
  } catch (error) {
    console.error("SEED ERROR:", error)
    res.status(500).json({ message: "Seeding failed" })
  }
})



router.post("/login", loginUser)

export default router
