

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import axios from 'axios'
import { toast } from 'sonner'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Loading from '../components/Loading'
import { Alert } from 'flowbite-react'
import Error from '../components/Error'



export default function UpdateClients() {

  const {url,token,fetchClients} = useContext(StoreContext)

  const [formData , setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const [error , setError] = useState(null)

  const navigate = useNavigate()

  const {clientId} = useParams()

  const [clientLoading ,setClientLoading] = useState(false)
  
  const [clientError , setClientError] = useState(false)

  // fetchClient
  const fetchClient = async () => {

    try
    {
        setClientLoading(true)

        setClientError(false)

        const res = await axios.get(url + `/api/client/get-client/${clientId}`)

        if(res.data.success)
        {
            setClientLoading(false)

            setFormData(res.data.client)
        }

    }
    catch(error)
    {
        setClientError(true)

        setClientLoading(false)

        console.log(error.message)
    }
    
  }

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

      const res = await axios.put(url + `/api/client/update-client/${clientId}`,formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        toast.success(`${res.data.updatedClient.name} added successfully`)

        navigate(-1)

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

  useEffect(() => {

    fetchClient()

  },[clientId])


  return (

    <>

      {!clientLoading && !clientError && (

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
              {loading ? (<Loading/>) : ("Update cient")}
            </button>

            {error && (

              <Alert color="failure">{error}</Alert>

            )}

          </form>

        </div>

      )}


      {clientLoading && !clientError && (

        <div className="h-screen w-full flex items-center justify-center">

          <Loading />

        </div>

      )}

      {clientError && (

        <Error retry={fetchClient}/>

      )}

    </>

  )

}
