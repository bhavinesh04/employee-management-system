export const createEmployeeApi = async (employeeData, token) => {
  const res = await fetch("http://localhost:3000/api/admin/create-employee", {
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
