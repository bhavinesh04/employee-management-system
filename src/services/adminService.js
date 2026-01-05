export const createEmployeeApi = async (employeeData, token) => {
  const res = await fetch("https://ems-backend-ai4o.onrender.com/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(employeeData)
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Failed to create employee")
  }

  return data
}
