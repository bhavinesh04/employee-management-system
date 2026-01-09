import axios from "axios"

const http = axios.create({
 baseURL: import.meta.env.VITE_API_URL,

})
console.log("API URL 👉", import.meta.env.VITE_API_URL)


export default http
