

import express from "express"
import { loginUser } from "../controllers/authController.js"
import bcrypt from "bcryptjs"
import User from "../models/User.js"

const router = express.Router()


router.post("/login", loginUser)

export default router
