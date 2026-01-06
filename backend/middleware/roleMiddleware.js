/* =========================
   🛂 ROLE AUTHORIZATION
   ========================= */

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Safety check (protect middleware must run first)
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "Not authenticated",
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      })
    }

    next()
  }
}
