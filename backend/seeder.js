import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import User from "./models/User.js"

dotenv.config()

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("🧹 Clearing users...")
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

    console.log("✅ Users seeded successfully")
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seedUsers()
