import http from "@/services/http"

/* =========================
   👷 EMPLOYEE TASKS
   ========================= */

// Get logged-in employee tasks
export const getMyTasksApi = async (token) => {
  try {
    const res = await http.get("/api/tasks/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch tasks"
    )
  }
}

// Accept task
export const acceptTaskApi = async (taskId, token) => {
  try {
    const res = await http.patch(
      `/api/tasks/${taskId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res.data
  } catch (error) {
    throw new Error("Failed to accept task")
  }
}

// Complete task (file upload handled elsewhere)
export const completeTaskApi = async (taskId, token) => {
  try {
    const res = await http.patch(
      `/api/tasks/${taskId}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res.data
  } catch (error) {
    throw new Error("Failed to complete task")
  }
}

// Fail task
export const failTaskApi = async (taskId, token) => {
  try {
    const res = await http.patch(
      `/api/tasks/${taskId}/fail`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res.data
  } catch (error) {
    throw new Error("Failed to fail task")
  }
}

/* =========================
   👑 ADMIN TASKS
   ========================= */

// Assign task
export const assignTaskApi = async (taskData, token) => {
  try {
    const res = await http.post(
      "/api/tasks/assign",
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to assign task"
    )
  }
}

// Get all tasks
export const getAllTasksApi = async (token) => {
  try {
    const res = await http.get("/api/admin/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (error) {
    throw new Error("Failed to fetch tasks")
  }
}

// Reassign task
export const reassignTaskApi = async (taskId, employeeId, token) => {
  try {
    const res = await http.patch(
      `/api/admin/tasks/${taskId}/reassign`,
      { employeeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res.data
  } catch (error) {
    throw new Error("Failed to reassign task")
  }
}

// Delete task
export const deleteTaskApi = async (taskId, token) => {
  try {
    const res = await http.delete(
      `/api/admin/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res.data
  } catch (error) {
    throw new Error("Failed to delete task")
  }
}
