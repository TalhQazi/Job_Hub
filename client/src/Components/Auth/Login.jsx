import React, { useContext, useState } from 'react'
import { Context } from "../../main"
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'
import { FaPencilAlt, FaRegUser } from 'react-icons/fa'
import { MdOutlineMailOutline } from 'react-icons/md'
import { FaPhoneFlip } from 'react-icons/fa6'
import { RiLock2Fill } from 'react-icons/ri'


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context)

  const handleGoogle = async(e)=>{
    e.preventDefault()
    await axios.get("")
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:4000/api/users/login", {
        password,
        email,
        role
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      toast.success(data.message)
      setEmail("")
      setPassword("")
      setRole("")
      setIsAuthorized(true)
    } catch (error) {
      toast.error(error.response.data.message)
      setIsAuthorized(false)
    }
  }

  if (isAuthorized) {
    return <Navigate to={"/"}></Navigate>
  }
  return (
    <div className="authPage">
      <div className="container">
        <div className="header">
          <img src="/JobZeelogo.png" alt="logo" />
          <h3>Login to a account</h3>
        </div>
        <form>
          <div className="inputTag">
            <label >
              Login As
            </label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select a role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>


          <div className="inputTag">
            <label >
              Email
            </label>
            <div>
              <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
              <MdOutlineMailOutline />
            </div>
          </div>


          <div className="inputTag">
            <label >
              Password
            </label>
            <div>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              <RiLock2Fill />
            </div>
          </div>
          <a className='googlebtn' href='http://localhost:4000/api/users/auth/google'>Continue with Google</a>
          <button onClick={handleLogin} type='submit'> Login </button>
          <Link to={'/register'}>Register Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/login.png" alt="login" />
      </div>
    </div>
  )
}

export default Login