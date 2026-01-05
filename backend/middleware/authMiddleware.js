import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Not authorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // 🔥 NORMALIZE USER OBJECT (IMPORTANT)
    req.user = {
      id: decoded.id || decoded._id,   // ✅ works for ALL tokens
      role: decoded.role,
    }
  
    next()
  } catch {
    res.status(401).json({ message: "Invalid token" })
  }
}
