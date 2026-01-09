import User from "../models/User.js"
import Task from "../models/Task.js"
import Message from "../models/Message.js"
import bcrypt from "bcryptjs"

/* =========================
   👤 EMPLOYEE MANAGEMENT
   ========================= */

// CREATE EMPLOYEE
export const createEmployee = async (req, res) => {
  try {
    const { firstName, email, password } = req.body

    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "Employee already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const employee = await User.create({
      firstName,
      email,
      password: hashedPassword,
      role: "employee",
    })

    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        _id: employee._id,
        firstName: employee.firstName,
        email: employee.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// GET ALL EMPLOYEES (WITHOUT PASSWORD)
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find(
      { role: "employee" },
      "-password"
    )
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees" })
  }
}

// RESET EMPLOYEE PASSWORD
export const resetEmployeePassword = async (req, res) => {
  try {
    const { employeeId, newPassword } = req.body

    if (!employeeId || !newPassword) {
      return res
        .status(400)
        .json({ message: "Employee ID and password required" })
    }

    const employee = await User.findById(employeeId)
    if (!employee || employee.role !== "employee") {
      return res.status(404).json({ message: "Employee not found" })
    }

    employee.password = await bcrypt.hash(newPassword, 10)
    await employee.save()

    res.json({ message: "Password reset successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

/* =========================
   📋 TASK MANAGEMENT (ADMIN)
   ========================= */

// GET ALL TASKS
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "firstName email")
      .sort({ createdAt: -1 })

    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" })
  }
}

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, date, category, assignedTo } = req.body

    if (!title || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Title and employee required" })
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
      assignedTo,
      newTask: true,
      active: false,
      completed: false,
      failed: false,
      reviewed: false,
      completedFile: null,
      taskFile: req.file?.filename || null,

    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" })
  }
}

// REASSIGN TASK
export const reassignTask = async (req, res) => {
  try {
    const { employeeId } = req.body
    const { id } = req.params

    const employee = await User.findById(employeeId)
    if (!employee || employee.role !== "employee") {
      return res.status(400).json({ message: "Invalid employee" })
    }

    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    task.set({
      assignedTo: employeeId,
      newTask: true,
      active: false,
      completed: false,
      failed: false,
    })

    await task.save()
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: "Failed to reassign task" })
  }
}

// REVIEW TASK
export const reviewTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { reviewed: true },
      { new: true }
    )

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: "Failed to review task" })
  }
}

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    await task.deleteOne()
    res.json({ message: "Task deleted successfully", taskId: id })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" })
  }
}

/* =========================
   💬 ADMIN MESSAGES
   ========================= */

// SEND MESSAGE (DIRECT OR BROADCAST)
export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body

    if (!content?.trim()) {
      return res.status(400).json({ message: "Message content required" })
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId || null, // null = broadcast
      content: content.trim(),
    })

    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" })
  }
}

// GET ADMIN SENT MESSAGES
export const getAdminMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      sender: req.user.id,
    })
      .populate("receiver", "firstName")
      .sort({ createdAt: -1 })

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" })
  }
}
