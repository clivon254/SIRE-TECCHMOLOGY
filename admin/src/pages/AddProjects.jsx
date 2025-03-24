

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import axios from 'axios'
import {toast} from "sonner"
import { useNavigate } from 'react-router-dom'




export default function AddProjects() {
  
  const {url,token,fetchProjects} = useContext(StoreContext)

  const [formData ,setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const [error , setError] = useState(null)

  const navigate = useNavigate()


  // handleChange
  const handleChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }

  
  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      setLoading(true)

      setError(null)

      const res = await axios.post(url + "/api/project/add-project",formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        toast.success(`${newProject.title} is successfully added`)

        navigate('/projects')

        fetchProjects()

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
        console.log(error.message)
      }

    }

  }



  return (

    <div className="section space-y-10">

      <h2 className="title2 text-center">Add Project</h2>

      <form onSubmit={handleSubmit} className="flex flex-col ">

        {/* title */}
        <div className="flex flex-col gap-y-0">

            <label className="label">Title</label>

            <input 
              type="text" 
              placeholder='title'
              name="title"
              onChange={handleChange}
              value={formData?.title}
              className="input" 
            />
            
        </div>

      </form>

    </div>

  )

}
