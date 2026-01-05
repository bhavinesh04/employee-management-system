
import jwt from "jsonwebtoken"
import User from "../models/User.js"

import bcrypt from "bcryptjs"


export const loginUser = async(req, res) => {
  const { email, password } = req.body

  try {
    // 1. Find user in DB
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }


  const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }




  

 // 🔐 CREATE TOKEN JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({
    success: true,
    token,
    user: {
      role: user.role,
      data: user
    }
  })
}catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

