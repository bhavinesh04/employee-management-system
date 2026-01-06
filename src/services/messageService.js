import http from "@/services/http"

/* =========================
   👷 EMPLOYEE
   ========================= */

export const getEmployeeMessagesApi = async (token) => {
  try {
    const res = await http.get("/api/messages/employee", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (error) {
    throw new Error("Failed to fetch messages")
  }
}

/* =========================
   👑 ADMIN
   ========================= */

export const sendMessageApi = async (messageData, token) => {
  try {
    const res = await http.post(
      "/api/messages/admin",   // ✅ FIXED
      messageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res.data
  } catch (error) {
    throw new Error("Failed to send message")
  }
}
