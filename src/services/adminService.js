import http from "@/services/http"

/**
 * Create a new employee (ADMIN ONLY)
 * @param {Object} employeeData - { firstName, email, password }
 * @param {string} token - JWT token
 */
export const createEmployeeApi = async (employeeData, token) => {
  try {
    const res = await http.post(
      "/api/admin/create-employee",
      employeeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to create employee"
    throw new Error(message)
  }
}
