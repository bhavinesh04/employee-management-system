import User from "../models/User.js"
import Task from "../models/Task.js"

// library so that admin cant see real password
import bcrypt from "bcryptjs"

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
      role: "employee"
    })

    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        _id: employee._id,
        firstName: employee.firstName,
        email: employee.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}




export const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" })
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees" })
  }
}


export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "firstName email")

    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" })
  }
}


export const resetEmployeePassword = async (req, res) => {
  try {
    const { employeeId, newPassword } = req.body

    if (!employeeId || !newPassword) {
      return res.status(400).json({ message: "Employee ID and password required" })
    }

    const employee = await User.findById(employeeId)

    if (!employee || employee.role !== "employee") {
      return res.status(404).json({ message: "Employee not found" })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    employee.password = hashedPassword
    await employee.save()

    res.json({ message: "Password reset successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

export const reassignTask = async (req, res) => {
  try {
    const { employeeId } = req.body
    const taskId = req.params.id

    const task = await Task.findById(taskId)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    task.assignedTo = employeeId
    task.newTask = true
    task.active = false
    task.completed = false
    task.failed = false

    await task.save()

    res.json(task)
  } catch (err) {
    res.status(500).json({ message: "Failed to reassign task" })
  }
}

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

export const reviewTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { reviewed: true },
      { new: true }
    )

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: "Failed to mark task as reviewed" })
  }
}

export const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      date,
      category,
      assignedTo,
    } = req.body

    if (!title || !assignedTo) {
      return res.status(400).json({ message: "Title and employee required" })
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
     taskFile: req.file ? `/uploads/${req.file.filename}` : null,
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" })
  }
}


import Message from "../models/Message.js"

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body


    if (!content?.trim()) {
      return res.status(400).json({ message: "Message content required" })
    }

    const newMessage = await Message.create({
      sender: req.user.id,          // ✅ ObjectId
      receiver: receiverId || null,  // ✅ null = broadcast
      content: content.trim(),                   // ✅ correct field
    })

    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ message: "Failed to send message" })
  }
}
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