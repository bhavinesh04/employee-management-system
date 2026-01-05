const API_URL = "http://localhost:3000/api/auth"

export const loginApi = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || "Login failed")
    }

    return data
  } catch (error) {
    throw error
  }
}
