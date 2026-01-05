export const getEmployeeMessagesApi = async (token) => {
  const res = await fetch("/api/messages/employee", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch messages")
  }

  return res.json()
}
