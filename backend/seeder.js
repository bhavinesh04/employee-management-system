import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "./models/User.js"

dotenv.config()

const users = [
  {
    firstName: "Dileep",
    email: "admin@example.com",
    password: "123",
    role: "admin"
  },
  {
    firstName: "Arjun",
    email: "arjun@example.com",
    password: "123",
    role: "employee"
  }
]

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await User.deleteMany()
    await User.insertMany(users)
    process.exit()
  } catch (error) {
    process.exit(1)
  }
}

seedUsers()
