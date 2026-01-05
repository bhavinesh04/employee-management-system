import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    date: Date,
    category: String,

    active: {
      type: Boolean,
      default: false,
    },
    newTask: {
      type: Boolean,
      default: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    failed: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    reviewed: {
  type: Boolean,
  default: false,
},

taskFile: {
  type: String,
  default: null,
},
    // ✅ FILE PATH MUST BE INSIDE SCHEMA
    completedFile: {
      type: String,
      default: null,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

const Task = mongoose.model("Task", taskSchema)
export default Task
