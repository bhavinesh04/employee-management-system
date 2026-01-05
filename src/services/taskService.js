// get employee tasks
export const getMyTasksApi = async (token) => {
  const res = await fetch("http://localhost:3000/api/tasks/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch tasks")
  return res.json()
}

// admin assigns task
export const assignTaskApi = async (taskData, token) => {
  const res = await fetch("http://localhost:3000/api/tasks/assign", {
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


// employee accepts task
export const acceptTaskApi = async (taskId, token) => {
  const res = await fetch(
    `http://localhost:3000/api/tasks/${taskId}/accept`,
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

// admin sees tasks
export const getAllTasksApi = async (token) => {
  const res = await fetch("http://localhost:3000/api/admin/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch tasks")
  }

  return res.json()
}

export const completeTaskApi = async (taskId, token) => {
  const res = await fetch(
    `http://localhost:3000/api/tasks/${taskId}/complete`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to complete task")
  }

  return res.json()
}
export const failTaskApi = async (taskId, token) => {
  const res = await fetch(
    `http://localhost:3000/api/tasks/${taskId}/fail`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return res.json()
}

export const reassignTaskApi = async (taskId, employeeId, token) => {
  const res = await fetch(
    `http://localhost:3000/api/admin/tasks/${taskId}/reassign`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ employeeId }),
    }
  )

  if (!res.ok) {
    throw new Error("Failed to reassign task")
  }

  return res.json()
}
export const deleteTaskApi = async (taskId, token) => {
  const res = await fetch(
    `http://localhost:3000/api/admin/tasks/${taskId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!res.ok) {
    throw new Error("Failed to delete task")
  }

  return res.json()
}

export const verifyTaskApi = async (taskId, token) => {
  const res = await fetch(
    `http://localhost:3000/api/admin/tasks/${taskId}/verify`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!res.ok) throw new Error("Verification failed")
  return res.json()
}

