import jwt from "jsonwebtoken"

/* =========================
   🔐 AUTH MIDDLEWARE
   ========================= */

export const protect = (req, res, next) => {
  console.log("🔐 AUTH HEADER:", req.headers.authorization)
  try {
    // Expect: Authorization: Bearer <token>
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    console.log("✅ DECODED USER:", decoded)

    // ✅ Normalize user object for entire app
    req.user = {
      id: decoded.id || decoded._id,
      role: decoded.role,
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}
