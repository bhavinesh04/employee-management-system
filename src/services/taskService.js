const BASE_URL = "https://ems-backend-ai4o.onrender.com"

// ================= EMPLOYEE =================

// get employee tasks
export const getMyTasksApi = async (token) => {
  const res = await fetch(`${BASE_URL}/api/tasks/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch tasks")
  return res.json()
}

// employee accepts task
export const acceptTaskApi = async (taskId, token) => {
  const res = await fetch(
    `${BASE_URL}/api/tasks/${taskId}/accept`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) throw new Error("Failed to accept task")
  const data = await res.json()
  return data.task
}

// employee completes task
export const completeTaskApi = async (taskId, token) => {
  const res = await fetch(
    `${BASE_URL}/api/tasks/${taskId}/complete`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) throw new Error("Failed to complete task")
  return res.json()
}

// employee fails task
export const failTaskApi = async (taskId, token) => {
  const res = await fetch(
    `${BASE_URL}/api/tasks/${taskId}/fail`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) throw new Error("Failed to fail task")
  return res.json()
}

// ================= ADMIN =================

// admin assigns task
export const assignTaskApi = async (taskData, token) => {
  const res = await fetch(`${BASE_URL}/api/tasks/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message)
  }

  return res.json()
}

// admin gets all tasks
export const getAllTasksApi = async (token) => {
  const res = await fetch(`${BASE_URL}/api/admin/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch tasks")
  return res.json()
}

// admin reassign task
export const reassignTaskApi = async (taskId, employeeId, token) => {
  const res = await fetch(
    `${BASE_URL}/api/admin/tasks/${taskId}/reassign`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ employeeId }),
    }
  )

  if (!res.ok) throw new Error("Failed to reassign task")
  return res.json()
}

// admin delete task
export const deleteTaskApi = async (taskId, token) => {
  const res = await fetch(
    `${BASE_URL}/api/admin/tasks/${taskId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) throw new Error("Failed to delete task")
  return res.json()
}

// admin verify task
export const verifyTaskApi = async (taskId, token) => {
  const res = await fetch(
    `${BASE_URL}/api/admin/tasks/${taskId}/verify`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) throw new Error("Verification failed")
  return res.json()
}

// ================= MESSAGES =================

// employee messages
export const getEmployeeMessagesApi = async (token) => {
  const res = await fetch(`${BASE_URL}/api/messages/employee`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch messages")
  return res.json()
}
