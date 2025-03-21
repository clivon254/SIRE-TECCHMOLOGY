


import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Error from '../components/Error'
import axios from "axios"
import { StoreContext } from '../context/store'
import Loading from '../components/Loading'
import Delete from '../components/Delete'
import { toast } from 'sonner'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoChatboxEllipsesOutline, IoChevronBackCircleOutline } from 'react-icons/io5'
import { getInitials } from '../utils'
import { MdAccessTime, MdOutlineMailOutline } from 'react-icons/md'
import { LuPhone } from "react-icons/lu"
import {} from "react-icons/io"





export default function ClientPage() {

  const {url,openDelete,setOpenDelete,setClients,token,fetchClients} = useContext(StoreContext)

  const {clientId} = useParams()

  const [client ,setClient] = useState({})
  
  const [clientLoading ,setClientLoading] = useState(false)
  
  const [clientError , setClientError] = useState(false)

  const navigate = useNavigate()


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

            setClient(res.data.client)
        }

    }
    catch(error)
    {
        setClientError(true)

        setClientLoading(false)

        console.log(error.message)
    }
    
  }

  // handleDelete
  const handleDelete = async () => {

    try
    {
        const res = await axios.delete(url + `/api/client/delete-client/${client._id}`,{headers:{token}})

        if(res.data.success)
        {
            setOpenDelete(false)

            setClients((prev) => 
                prev.filter(client => client._id !== client._id)
            )

            toast.error(`${client?.name} is deleted successfully`)

            navigate('/clients')

            fetchClients()
          
        }

    }
    catch(error)
    {
        console.log(error.message)
    }

  }

  console.log(client)

  useEffect(() => {

    fetchClient()

  },[clientId])

  return (

    <>

      {!clientLoading && !clientError && (

        <section className="section space-y-10">

          {/* header */}
          <header className="flex flex-col gap-y-3 sm:flex-row sm:justify-between sm:items-center ">

            {/* title */}
            <div className="">

              <h1 className="title2 text-primary">Clients Details</h1>

              <h4 className="text-xs md:text-sm 2xl:text-xl text-slate-600">Detailed information about the potential client</h4>

            </div>

            {/* action */}
            <div className="flex items-center gap-x-2">

              <button className="bg-yellow-400 text-white px-3 py-1 font-semibold rounded-md">

                <Link to={`/update-client/${client?._id}`} className="flex items-center gap-x-2">

                  <FaEdit/> Edit

                </Link>

              </button>

              <button 
                className="flex items-center gap-x-2 bg-gray-500 text-white font-semibold px-3 py-1 rounded-md"
                onClick={() => navigate(-1)}
              >
                  <IoChevronBackCircleOutline /> Back
              </button>

            </div>

          </header>

          {/* client */}
          <div className="shadow-xl p-5 border border-slate-100 rounded-md grid grid-cols-1 md:grid-cols-2 gap-y-8">

            {/* left */}
            <div className="space-y-5">

              {/* name */}
              <div className="flex gap-x-3">

                <span className=" h-16 w-16 rounded-full bg-red-50 text-primary flex items-center justify-center font-extrabold">
                  {getInitials(client?.name)}
                </span>

                <div className="space-y-1">

                  <span className="text-3xl block font-semibold">{client?.name}</span>

                  <span className="text-slate-500 block text-xs lg:text-sm">{client?.status ? "Client" : "Possible client"}</span>

                </div>

              </div>

              {/* email */}
              <div className="flex items-center gap-x-3">

                  <span className="text-primary">

                   <MdOutlineMailOutline />

                  </span>

                  <span className="text-slate-600 text-sm">{client?.email}</span>

              </div>

              {/* phone */}
              <div className="flex items-center gap-x-3">

                <span className="text-primary">

                  <LuPhone />

                </span>

                <span className="text-slate-600">{client?.phone}</span>

              </div>

            </div>

            {/* right */}
            <div className="space-y-5">

              <h2 className="text-xl font-semibod text-primary">Additional Information</h2>
              
              {/* whats app */}
              <div className="tex-sm flex items-center gap-x-2">

                <span className="flex items-center gap-1 font-bold">
                  <MdAccessTime /> whatsapp :
                </span>

                <span className="text-slate-600">
                  {client?.whatsapp} 
                </span>

              </div>

              {/* notes */}
              <div className="bg-gray-100 space-y-3 rounded-md p-2">

                <h3 className="text-primary text-sm font-semibold">Notes :</h3>

                <p className="text-sm text-slate-600">
                  {client?.additional}
                </p>

              </div>

            </div>

          </div>

          {/* actions */}
          <div className="w-full flex flex-wrap gap-y-2 gap-x-2 text-white text-sm lg:text-base">

            <button 
              className="bg-blue flex items-center gap-x-3 border border-gray-200 px-4 rounded-md shadow-sm-light py-1"
            >
              <LuPhone /> Call 
            </button>

            <button 
              className="bg-green flex items-center gap-x-3 border border-gray-200 px-4 rounded-md shadow-sm-light py-1"
            >
              <IoChatboxEllipsesOutline /> WhatsApp 
            </button>

            <button 
              className="bg-purple flex items-center gap-x-3 border border-gray-200 px-4 rounded-md shadow-sm-light py-1"
            >
              <LuPhone /> Manage Interactions
            </button>

            {client?.status && 

              <button 
                className="bg-green flex items-center gap-x-3 border border-gray-200 px-4 rounded-md shadow-sm-light py-1"
              >
                <LuPhone /> Convert to Client
              </button>

            }

            <button 
              onClick={() => setOpenDelete(true)}
              className="bg-primary flex items-center gap-x-3 border border-gray-200 px-4 rounded-md shadow-sm-light py-1"
            >
              <FaTrash /> Delete
            </button>
            
          </div>

          {/* communication */}
          <div className="space-y-4">

            <div className="space-y-1">

              <h2 className="text-primary/70 text-base font-semibold">SMS TEMPLATE</h2>
              
              <p className="text-sm text-slate-500">Use Custom Message</p>
            
            </div>

            <div className="space-y-1">

              <h2 className="text-primary/70 text-base font-semibold">PHONE NUMBER</h2>
              
              <p className="text-sm text-slate-500">{client?.phone}</p>
            
            </div>

          </div>

        </section>

      )}

      {clientLoading && !clientError && (

        <div className="h-screen w-full flex items-center justify-center">
        
            <Loading />
        
        </div>

      )}

      {clientError && (

        <Error retry={fetchClient}/>

      )}

      {openDelete && (

        <Delete handleDelete={handleDelete} product={"client"} item={client?.name}/>

      )}

    </>

  )
}
