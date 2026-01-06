import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // 🔍 faster login queries
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 NEVER return password by default
    },

    role: {
      type: String,
      enum: ["admin", "employee"],
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)
export default User
