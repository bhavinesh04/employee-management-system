import Task from "../models/Task.js"
import User from "../models/User.js"

export const assignTask = async (req, res) => {
  try {

    const { title, description, date, category, assignedTo } = req.body

    if (!assignedTo) {
  
      return res.status(400).json({ message: "assignedTo missing" })
    }

    const employee = await User.findById(assignedTo)

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }

    if (employee.role !== "employee") {
      return res.status(403).json({ message: "User is not employee" })
    }

    const task = await Task.create({
      title,
      description,
      date,
      category,
      assignedTo: employee._id,
      active: false,
      newTask: true,
      completed: false,
      failed: false,
    })

    return res.status(201).json({ message: "Task assigned successfully", task })
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message })
  }
}


export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

export const acceptTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })

    task.active = true
    task.newTask = false
    await task.save()

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

export const completeTask = async (req, res) => {
  try {

    if (req.user.role !== "employee") {
      return res.status(403).json({ message: "Only employees can complete tasks" })
    }

    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    task.completed = true
    task.active = false
    task.failed = false
    task.newTask = false

    //save file path
    if (req.file) {
  task.completedFile = {
    name: req.file.originalname,
    path: `/uploads/${req.file.filename}`,
  }
}


    await task.save()

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

export const failTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    task.failed = true
    task.completed = false
    task.active = false
    task.newTask = false

    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: "Failed to fail task" })
  }
}




