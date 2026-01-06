import multer from "multer"
import path from "path"

/* =========================
   📁 FILE STORAGE CONFIG
   ========================= */

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/")
  },
  filename(req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${uniqueName}${path.extname(file.originalname)}`)
  },
})

/* =========================
   🛡️ FILE VALIDATION
   ========================= */

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    ".pdf",
    ".doc",
    ".docx",
    ".png",
    ".jpg",
    ".jpeg",
  ]

  const ext = path.extname(file.originalname).toLowerCase()

  if (!allowedTypes.includes(ext)) {
    return cb(
      new Error("Only PDF, DOC, DOCX, PNG, JPG, JPEG files are allowed"),
      false
    )
  }

  cb(null, true)
}

/* =========================
   📦 MULTER CONFIG
   ========================= */

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
})

export default upload
