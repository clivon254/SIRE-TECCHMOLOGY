

import React, { useState } from 'react'
import LOGOO from "../assets/SIRELOGO.png"




export default function SignIn() {

  const [showPassword, setShowPassword] = useState(false)

  return (

    <div className="section flex  items-center justify-between min-h-screen">

      <div className="w-full  gap-y-5 ">

        {/* header */}
        <div className="w-full flex flex-col items-center">

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
        <form action="" className="w-full mx-auto max-w-lg">

          {/* email */}
          <div className=" flex flex-col gap-y-2">

              <label className="label">password</label>


              <input type="text" className="input" />

          </div>

          {/* password */}
          <div className=" flex flex-col gap-y-2">

              <label className="label">password</label>

              <div className="w-full relative">

                  <input 
                    type={showPassword ? "text" :"password"} 
                    className="input" 
                  />

                  <button className="button"></button>

              </div>

          </div>

        </form>

      </div>

    </div>

  )
  
}
