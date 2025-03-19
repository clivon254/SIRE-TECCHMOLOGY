

import React, { createContext, useEffect, useState } from 'react'
import { MdHome, MdOutlineDashboard } from 'react-icons/md'
import {FiUsers} from "react-icons/fi"
import axios from "axios"




export const StoreContext = createContext(null)



export default function StoreContextProvider(props) {


  const url = "http://localhost:2700"

  const [token, setToken] = useState("")

  const [open ,setOpen] = useState(false)

  const [openDelete,setOpenDelete] = useState(false)

  const [Navlinks ,setNavlinks] = useState([
    {
      path:'/',
      title:"Dashboard",
      icon:<MdOutlineDashboard/>
    },
    {
      path:'/clients',
      title:"Clients",
      icon:<FiUsers/>
    },

  ])


  const [clients , setClients] = useState([])

  const [clientsLoading ,setClientsLoading] = useState(false)

  const [clientsError , setClientsError] = useState(false)


  // fetchClients
  const fetchClients = async () => {

    try
    {
      setClientsLoading(true)

      setClientsError(false)

      const res = await axios.get(url + "/api/client/get-clients",{headers:{token}})

      if(res.data.success)
      {
        setClientsLoading(false)

        setClients(res.data.clients)

      }

    }
    catch(error){

      setClientsError(true)

      setClientsLoading(false)

      console.log(error.message)

    }

  }
  
  useEffect(() => {

    if(localStorage.getItem("token"))
    {
      setToken(localStorage.getItem("token"))
    }

  },[token])


  useEffect(() => {

    fetchClients()

  },[])

  console.log(clients)

  const contextValue = {
    url,
    token,setToken,
    open,setOpen,
    openDelete , setOpenDelete,
    Navlinks, setNavlinks,
    clients, setClients,
    clientsLoading, setClientsLoading,
    clientsError, setClientsError,
    fetchClients,
  }
  

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
