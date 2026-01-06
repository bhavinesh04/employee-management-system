import http from "@/services/http"

/**
 * Login user (Admin / Employee)
 * @param {string} email
 * @param {string} password
 */
export const loginApi = async (email, password) => {
  try {
    const res = await http.post("/api/auth/login", {
      email,
      password,
    })

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed"
    throw new Error(message)
  }
}
