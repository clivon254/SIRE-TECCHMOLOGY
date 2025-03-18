

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
import { toast } from 'sonner'


export default function ForgotPassword() {

  const {url,setToken} = useContext(StoreContext)

  const [formData ,setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(null)

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
      setLoading(true)

      setError(null)

      const res = await axios.post(url + "/api/auth/forgot-password",formData)

      if(res.data.success)
      {
        
        setLoading(false)

        toast.success("Link sent to your email account")

        setFormData({})

      }

    }
    catch(error)
    {

      setLoading(false)

      if(error.response)
      {
        const errorMessage = error.response.data.message 

        setError(errorMessage)

      }
      else
      {
        setError(error.message)
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
          <div className="space-y-2">

            <h2 className="text-center title2">Forgot Password</h2>

            <p className="text-center max-w-lg font-semibold">Enter your signed up email account and a link will be sent to reset the password</p>

          </div>

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

          {/* button */}
          <button 
            className="button"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loading/> : ("submit")}
          </button>

          {error && (

            <Alert color='failure'>{error}</Alert>

          )}

        </form>

      </div>

    </div>

  )
  
}
