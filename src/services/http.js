import axios from "axios"

const http = axios.create({
  baseURL: "https://employee-management-system-jv0w.onrender.com",
})

console.log("API URL 👉", "https://employee-management-system-jv0w.onrender.com")

export default http
