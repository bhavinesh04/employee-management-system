import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"



/* =========================
   🔐 LOGIN USER
   ========================= */

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      })
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // 🛑 VERY IMPORTANT SAFETY CHECK
    if (!user.password) {
      return res.status(500).json({
        message: "User password missing in database. Please reseed users.",
      })
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    // 5️⃣ Send SAFE response (NO PASSWORD)
    res.status(200).json({
      success: true,
      token,
      user: {
        role: user.role,
        data: {
          _id: user._id,
          firstName: user.firstName,
          email: user.email,
        },
      },
    })
  } catch (error) {
    console.error("LOGIN ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
}
