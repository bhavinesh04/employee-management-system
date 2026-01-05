import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/AuthProvider"

const AdminSendMessage = ({ employees }) => {
  const { token } = useContext(AuthContext)

  const [content, setContent] = useState("")
  const [receiverId, setReceiverId] = useState("all")
  const [loading, setLoading] = useState(false)
const [sentMessages, setSentMessages] = useState([])

const fetchSentMessages = async () => {
    try {
      if (!token) return

      const res = await fetch("${BASE_URL}
/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      setSentMessages(data)
    } catch (err) {
    }
  }

useEffect(() => {
    fetchSentMessages()
  }, [token])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!content.trim()) {
      alert("Message cannot be empty")
      return
    }

    try {
      setLoading(true)

      await fetch("${BASE_URL}
/api/admin/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          receiverId: receiverId === "all" ? null : receiverId,
        }),
      })
await fetchSentMessages()
      alert("Message sent successfully")
      setContent("")
      setReceiverId("all")

      fetchSentMessages()


    } catch (error) {
      alert("Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#111827] p-6 rounded-xl max-w-2xl">
      <h2 className="text-xl font-semibold text-white mb-4">
        Send Message
      </h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Write message..."
          className="w-full bg-[#0F172A] border border-gray-700 text-gray-200 rounded p-3"
        />

        <select
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="w-full bg-[#0F172A] border border-gray-700 text-gray-200 rounded p-2"
        >
          <option value="all">All Employees</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>
              {emp.firstName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* SENT MESSAGES */}
      <div className="mt-8 space-y-4"> <h3 className="text-lg font-semibold text-white"> Sent Messages </h3> {sentMessages.map(msg => ( <div key={msg._id} className="bg-[#111827] border border-gray-800 rounded-lg p-4" > <p className="text-sm text-gray-400 mb-1"> To: {msg.receiver ? msg.receiver.firstName : "All Employees"} </p> <p className="text-gray-200"> {msg.content} </p> <p className="text-xs text-gray-500 mt-2"> {new Date(msg.createdAt).toLocaleString()} </p> </div> ))} </div> 
    </div>
    
  )
}

export default AdminSendMessage
