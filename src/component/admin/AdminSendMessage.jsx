import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthProvider"
import http from "@/services/http"

const AdminSendMessage = ({ employees }) => {
  const { token } = useContext(AuthContext)

  const [message, setMessage] = useState("")
  const [receiverId, setReceiverId] = useState("")
  const [messages, setMessages] = useState([])

  // ---------------- FETCH MESSAGES ----------------
  const fetchMessages = async () => {
    if (!token) return
    try {
      const res = await http.get("/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMessages(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [token])

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    try {
      await http.post(
        "/api/admin/messages",
        {
          content: message,              // ✅ FIXED
          receiverId: receiverId || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setMessage("")
      setReceiverId("")
      fetchMessages()
    } catch (err) {
      console.error(err.response?.data || err)
      alert("Failed to send message")
    }
  }

  return (
    <div className="bg-[#1C1C1C] p-5 rounded">
      <form onSubmit={sendMessage} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write message..."
          className="w-full p-2 bg-transparent border rounded"
        />

        <select
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="w-full p-2 bg-transparent border rounded"
        >
          <option value="">Send to all employees</option>
          {employees?.map(emp => (
            <option key={emp._id} value={emp._id}>
              {emp.firstName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-emerald-600 px-4 py-2 rounded hover:bg-emerald-700"
        >
          Send Message
        </button>
      </form>

      <div className="mt-5 space-y-2">
        {messages.map(msg => (
          <div key={msg._id} className="border p-2 rounded text-sm">
            <p>{msg.content}</p>   {/* ✅ FIXED */}
            {msg.receiver?.firstName && (
              <p className="text-gray-400 text-xs">
                To: {msg.receiver.firstName}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminSendMessage
