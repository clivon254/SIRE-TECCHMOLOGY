

import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/store'
import axios from 'axios'
import { toast } from 'sonner'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Loading from '../components/Loading'
import { Alert } from 'flowbite-react'



export default function AddClients() {

  const {url,token,fetchClients} = useContext(StoreContext)

  const [formData , setFormData] = useState({})

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

      const res = await axios.post(url + "/api/client/add-client",formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        toast.success(`${res.data.newClient.name} added successfully`)

        navigate('/clients')

        fetchClients()
      }

    }
    catch(error)
    {
      setLoading(false)

      if(error.response)
      {
        setError(error.response.data.message)
      }
      else
      {
        setError(error.message)
      }

      console.log(error.message)
    }

  }



  return (

    <div className="section">

      <h2 className="title2 text-center">Add Client</h2>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-3 mx-auto max-w-xl">

        {/* name */}
        <div className="w-full flex flex-col gap-y-2">

          <label  className="label">Name</label>

          <input 
            type="text" 
            className="input" 
            placeholder="client name . . . . . "
            name='name'
            value={formData.name}
            onChange={handleChange}
          />

        </div>

        {/* email */}
        <div className="w-full flex flex-col gap-y-2">

          <label  className="label">email</label>

          <input 
            type="email" 
            className="input" 
            placeholder="name@example.com"
            name='email'
            value={formData.email}
            onChange={handleChange}
          />

        </div>

        {/* phone */}
        <div className="w-full flex flex-col gap-y-2">

          <label  className="label">phone</label>

          <input 
            type="text" 
            className="input" 
            placeholder="07XXXXXXX"
            name='phone'
            value={formData.phone}
            onChange={handleChange}
          />

        </div>

        {/* whatsapp */}
        <div className="w-full flex flex-col gap-y-2">

          <label  className="label">whatsapp</label>

          <input 
            type="text" 
            className="input" 
            placeholder="07XXXXXXX"
            name='whatsapp'
            value={formData.whatsapp}
            onChange={handleChange}
          />

        </div>

        {/* additional */}
        <div className="w-full flex flex-col gap-y-2">

          <label className="label">Description</label>

          <textarea 
            name="additional" 
            id=""
            className="input"
            placeholder="type here . . . . "
            value={formData.additional}
            onChange={handleChange}
          />

        </div>

        <button 
          className="button"
          disabled={loading}
          type="submit"
        >
          {loading ? (<Loading/>) : ("Add cient")}
        </button>

        {error && (

          <Alert color="failure">{error}</Alert>

        )}

      </form>

    </div>

  )

}
