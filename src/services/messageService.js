const BASE_URL = "https://ems-backend-ai4o.onrender.com"

// ================= ADMIN =================

// Admin sends message (broadcast or to specific employee)
export const sendMessageApi = async (messageData, token) => {
  const res = await fetch(`${BASE_URL}/api/messages/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(messageData),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || "Failed to send message")
  }

  return res.json()
}

// ================= EMPLOYEE =================

// Employee fetches messages
export const getEmployeeMessagesApi = async (token) => {
  const res = await fetch(`${BASE_URL}/api/messages/employee`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch messages")
  }

  return res.json()
}
