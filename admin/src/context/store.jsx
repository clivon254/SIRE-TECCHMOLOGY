

import React, { createContext, useEffect, useState } from 'react'
import { MdHome, MdOutlineDashboard } from 'react-icons/md'
import {FiUsers} from "react-icons/fi"
import axios from "axios"
import { GoProject } from 'react-icons/go'




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
      icon:<MdOutlineDashboard size={20}/>
    },
    {
      path:'/clients',
      title:"Clients",
      icon:<FiUsers size={20}/>
    },
    {
      path:'/projects',
      title:"Projects",
      icon:<GoProject size={20}/>
    }

  ])


  const [clients , setClients] = useState([])

  const [clientsLoading ,setClientsLoading] = useState(false)

  const [clientsError , setClientsError] = useState(false)

  const [projects , setProjects] = useState([])

  const [projectsLoading , setProjectsLoading] = useState(false)

  const [projectsError , setProjectsError] = useState(false)



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
  
  // fetchProjects
  const fetchProjects = async () => {

    try
    {
      setProjectsLoading(true)

      setProjectsError(false)

      const res = await axios.get(url + "/api/project/get-projects", {headers:{token}})

      if(res.data.success)
      {
        setProjects(res.data.projects)

        setProjectsLoading(false)
      }

    }
    catch(error)
    {
      setProjectsLoading(false)

      setProjectsError(false)

      console.log(error.message)
    }

  }


  useEffect(() => {

    if(localStorage.getItem("token"))
    {

      setToken(localStorage.getItem("token"))

      fetchProjects()

      fetchProjects()
      
    }

  },[token])


  useEffect(() => {

    fetchClients()

    fetchProjects()

  },[])


  console.log(clients)

  console.log(projects)

  console.log(token)


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
    projects,setProjects,
    projectsLoading, setProjectsLoading,
    projectsError, setProjectsError,
    fetchProjects
  }
  

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
