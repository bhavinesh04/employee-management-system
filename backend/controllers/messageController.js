import Message from "../models/Message.js"

/* =========================
   👨‍💼 ADMIN – SEND MESSAGE
   ========================= */

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Message content required" })
    }

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver: receiverId || null, // null = broadcast
      content: content.trim(),
    })

    res.status(201).json(newMessage)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to send message" })
  }
}

/* =========================
   👨‍💼 ADMIN – GET MESSAGES
   ========================= */

export const getAdminMessages = async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user.id })
      .populate("receiver", "firstName")
      .sort({ createdAt: -1 })

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" })
  }
}

/* =========================
   👨‍💻 EMPLOYEE – GET MESSAGES
   ========================= */

export const getEmployeeMessages = async (req, res) => {
    console.log("📩 EMPLOYEE MESSAGE API HIT")
  console.log("👤 EMPLOYEE ID:", req.user.id)
  try {
    const employeeId = req.user.id

    const messages = await Message.find({
      $or: [{ receiver: employeeId }, { receiver: null }],
    })
      .populate("sender", "firstName role")
      .sort({ createdAt: -1 })
      console.log("📨 MESSAGES FOUND:", messages.length)

    res.status(200).json(messages)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch messages" })
  }
}
