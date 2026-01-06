import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // 🔍 faster queries
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null = broadcast message
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000, // 🛡️ prevent abuse
    },
  },
  {
    timestamps: true,
  }
)

// Optional compound index for inbox queries
messageSchema.index({ receiver: 1, createdAt: -1 })

export default mongoose.model("Message", messageSchema)
