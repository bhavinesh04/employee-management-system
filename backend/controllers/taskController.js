import Task from "../models/Task.js"
import User from "../models/User.js"

/* =========================
   📌 ADMIN – ASSIGN TASK
   ========================= */

export const assignTask = async (req, res) => {
  try {
    const { title, description, date, category, assignedTo } = req.body

    if (!title || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Title and employee are required" })
    }

    const employee = await User.findById(assignedTo)
    if (!employee || employee.role !== "employee") {
      return res.status(400).json({ message: "Invalid employee" })
    }

    const task = await Task.create({
      title,
      description,
      date,
      category,
      assignedTo: employee._id,
      newTask: true,
      active: false,
      completed: false,
      failed: false,
      reviewed: false,
      completedFile: null,
    })

    res.status(201).json({
      message: "Task assigned successfully",
      task,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

/* =========================
   👨‍💻 EMPLOYEE – GET MY TASKS
   ========================= */

export const getMyTasks = async (req, res) => {
    console.log("📋 GET MY TASKS HIT")
  console.log("👤 USER ID:", req.user.id)
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    }).sort({ createdAt: -1 })
 console.log("📦 TASKS FOUND:", tasks.length)
    res.status(200).json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch tasks" })
  }
}

/* =========================
   👨‍💻 EMPLOYEE – ACCEPT TASK
   ========================= */

export const acceptTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // ensure employee owns task
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" })
    }

    task.newTask = false
    task.active = true
    task.completed = false
    task.failed = false

    await task.save()
    res.status(200).json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to accept task" })
  }
}

/* =========================
   👨‍💻 EMPLOYEE – COMPLETE TASK
   ========================= */

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" })
    }

    task.completed = true
    task.active = false
    task.failed = false
    task.newTask = false

    // Save completed file if uploaded
   if (req.file) {
  task.completedFile = `/uploads/${req.file.filename}`
}


    await task.save()
    res.status(200).json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to complete task" })
  }
}

/* =========================
   👨‍💻 EMPLOYEE – FAIL TASK
   ========================= */

export const failTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" })
    }

    task.failed = true
    task.completed = false
    task.active = false
    task.newTask = false

    await task.save()
    res.status(200).json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to mark task as failed" })
  }
}
