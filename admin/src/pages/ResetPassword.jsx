

import React, { useContext, useState } from 'react'
import LOGOO from "../assets/SIRELOGO.png"
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import {Link, useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import axios from "axios"
import { StoreContext } from '../context/store'
import Loading from '../components/Loading'
import {Alert} from "flowbite-react"
import { toast } from 'sonner'


export default function ResetPassword() {

  const {url,setToken} = useContext(StoreContext)

  const [formData ,setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {token} = useParams()
  
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

      const res = await axios.post(url + `/api/auth/reset-password/${token}`,formData)

      if(res.data.success)
      {
        
        setLoading(false)

        toast.success("password resetSuccessfully")

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

            <h2 className="text-center title2">Reset Password</h2>

          </div>

        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="w-full mx-auto max-w-lg space-y-3">

          {/* password */}
          <div className=" flex flex-col gap-y-2">
          
              <label className="label">password</label>

              <div className="w-full relative">

                  <input 
                    type={showPassword ? "text" :"password"} 
                    className="input w-full" 
                    placeholder="************"
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
          
          {/* confirmPassword */}
          <div className=" flex flex-col gap-y-2">
          
            <label className="label">confirm password</label>

            <div className="w-full relative">

                <input 
                  type={showConfirmPassword ? "text" :"password"} 
                  className="input w-full" 
                  placeholder="**************"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />

                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ?
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
