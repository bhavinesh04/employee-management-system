import React, { useContext,useState } from 'react'
import { AuthContext } from "@/context/AuthProvider"

const Login = ({handleLogin}) => {

  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState( '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")


  const submitHandler = async(e) => {
    e.preventDefault()
    const success = login(email, password)

     if (!success) {
      setError("Invalid credentials")
    }
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='border-2 border-emerald-600 p-20'>
      <form 
      onSubmit={(e) => {
        submitHandler(e)
      }}
      className='flex  flex-col items-center justify-center'> 
        <input value={email} onChange={(e) => {
          setEmail(e.target.value)
        }} required className='text-white outline-none bg-transparent placeholder:text-gray-400 border-2 border-emerald-600 py-4 px-3 text-xl rounded-full' type='email' placeholder='enter your email'/>

        <input 
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)

        }} className=' mt-4 text-white outline-none bg-transparent placeholder:text-gray-400 border-2 border-emerald-600 py-4 px-3 text-xl rounded-full' type='password' placeholder='enter a password'/>

        <button className=' mt-5 text-white outline-none  placeholder:text-white border-none bg-emerald-600 py-3 px-5 text-xl rounded-full '>Log in</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      </div>
      </div>
  )
}

export default Login;