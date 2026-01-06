import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    /* =========================
       📝 BASIC TASK INFO
       ========================= */

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
    },

    category: {
      type: String,
      trim: true,
    },

    /* =========================
       📌 TASK STATUS FLAGS
       ========================= */

    newTask: {
      type: Boolean,
      default: true,
    },

    active: {
      type: Boolean,
      default: false,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    failed: {
      type: Boolean,
      default: false,
    },

    reviewed: {
      type: Boolean,
      default: false,
    },

    /* =========================
       📁 FILES
       ========================= */

    // File uploaded by admin while creating task
    taskFile: {
      type: String,
      default: null,
    },

    // File uploaded by employee after completing task
    completedFile: {
      type: String,
      default: null,
    },

    /* =========================
       👤 ASSIGNED EMPLOYEE
       ========================= */

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // 🔍 faster employee task queries
    },
  },
  {
    timestamps: true,
  }
)

/* =========================
   🔍 INDEXES (PERFORMANCE)
   ========================= */

// Common dashboard queries
taskSchema.index({ assignedTo: 1, createdAt: -1 })
taskSchema.index({ newTask: 1 })
taskSchema.index({ active: 1 })
taskSchema.index({ completed: 1 })
taskSchema.index({ failed: 1 })

const Task = mongoose.model("Task", taskSchema)
export default Task
