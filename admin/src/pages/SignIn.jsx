

import React, { useContext, useState } from 'react'
import LOGOO from "../assets/SIRELOGO.png"
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import axios from "axios"
import { StoreContext } from '../context/store'
import Loading from '../components/Loading'
import {Alert} from "flowbite-react"


export default function SignIn() {

  const {url,setToken} = useContext(StoreContext)

  const [formData ,setFormData] = useState({})

  const [showPassword, setShowPassword] = useState(false)

  const {loading,error} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  
  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]:e.target.value})

  }


  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      dispatch(signInStart())

      const res = await axios.post(url + "/api/auth/sign-in",formData)

      if(res.data.success)
      {
        setToken(res.data.setToken)

        dispatch(signInSuccess(res.data.rest))

        navigate('/')

        localStorage.setItem("token", res.data.token)

      }

    }
    catch(error)
    {

      console.log(error.message)
      
      if(error.response)
      {
        const errorMessage = error.response.data.message 

        dispatch(signInFailure(errorMessage))
      }
      else
      {
        dispatch(signInFailure(error.message))
      }

    }

  }

  console.log(formData)

  return (

    <div className="section flex  items-center justify-between min-h-screen">

      <div className="flex flex-col gap-y-5 w-full">

        {/* header */}
        <div className="w-full flex flex-col items-center gap-y-3">

          {/* logo */}
          <div className="h-24 w-60">

            <img 
              src={LOGOO}
              alt=""
              className="" 
            />

          </div>

          {/* title */}
          <h2 className="text-center title2">Sign in to your account</h2>

        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="w-full mx-auto max-w-lg space-y-3">

          {/* email */}
          <div className=" flex flex-col gap-y-2">

              <label className="label">email</label>

              <input 
                type="email" 
                className="input" 
                placeholder='name@exmaple.com'
                onChange={handleChange}
                name="email"
                value={formData.email}
              />

          </div>

          {/* password */}
          <div className=" flex flex-col gap-y-2">

              <label className="label">password</label>

              <div className="w-full relative">

                  <input 
                    type={showPassword ? "text" :"password"} 
                    className="input w-full" 
                    placeholder="********"
                    name="password"
                    onChange={handleChange}
                    value={formData.pass}
                  />

                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?
                     (
                      <IoMdEyeOff size={20}/>
                     )
                     :
                     (
                      <IoEye size={20}/>
                     )
                    }
                  </button>

              </div>

          </div>

          {/* rem && forgot */}
          <div className="flex items-center justify-between">

            {/* remember me  */}
            <div className="flex items-center gap-x-3">

              <input type="checkbox" className="rounded-md" />

              <label className="label">remember me</label>

            </div>

            {/* forgot password */}
            <span className="label">

              <Link to="/forgot-password">Forgot password</Link>

            </span>

          </div>

          {/* button */}
          <button 
            className="button"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loading/> : ("sign in")}
          </button>

          {error && (

            <Alert color='failure'>{error}</Alert>

          )}

        </form>

      </div>

    </div>

  )
  
}
