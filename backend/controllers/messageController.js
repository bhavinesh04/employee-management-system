import Message from "../models/Message.js"

export const getEmployeeMessages = async (req, res) => {
  try {
    const employeeId = req.user.id

    const messages = await Message.find({
      $or: [
        { receiver: employeeId },
        { receiver: null }, // broadcast
      ],
    })
      .populate("sender", "name role")
      .sort({ createdAt: -1 })

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" })
  }
}
