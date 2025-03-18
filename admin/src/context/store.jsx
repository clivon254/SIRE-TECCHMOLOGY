

import React, { createContext, useEffect, useState } from 'react'
import { MdHome, MdOutlineDashboard } from 'react-icons/md'
import {FiUsers} from "react-icons/fi"



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
      path:'/client',
      title:"Clients",
      icon:<FiUsers/>
    },

  ])
  
  useEffect(() => {

    if(localStorage.getItem("token"))
    {
      setToken(localStorage.getItem("token"))
    }

  },[token])

  const contextValue = {
    url,
    token,setToken,
    open,setOpen,
    openDelete , setOpenDelete,
    Navlinks, setNavlinks
  }
  

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
