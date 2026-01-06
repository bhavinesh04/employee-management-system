import Task from "../models/Task.js"

export const getMyTasks = async (req, res) => {
  try {
    const employeeId = req.user.id

    const tasks = await Task.find({ assignedTo: employeeId })
      .sort({ createdAt: -1 })

    res.status(200).json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch employee tasks" })
  }
}
