

import React, { createContext, useEffect, useState } from 'react'
import { MdHome, MdOutlineDashboard } from 'react-icons/md'
import {FiUsers} from "react-icons/fi"
import axios from "axios"
import { GoProject } from 'react-icons/go'
import { ImFilesEmpty } from "react-icons/im";
import { FaFileInvoiceDollar } from "react-icons/fa";




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
    },
    {
      path:'/quatations',
      title:"Quatations",
      icon:<ImFilesEmpty size={20}/>
    },
    {
      path:'/invoices',
      title:"Invoices",
      icon:<FaFileInvoiceDollar size={20}/>
    }

  ])

  const [clients , setClients] = useState([])

  const [clientsLoading ,setClientsLoading] = useState(false)

  const [clientsError , setClientsError] = useState(false)

  const [projects , setProjects] = useState([])

  const [projectsLoading , setProjectsLoading] = useState(false)

  const [projectsError , setProjectsError] = useState(false)

  const [quatations , setQuatations] = useState([])

  const [quatationsLoading , setQuatationsLoading] = useState(false)

  const [quatationsError , setQuatationsError] = useState(false)

  const [invoices ,setInvoices] = useState([])

  const [invoicesLoading ,setInvoicesLoading] = useState(false)

  const [invoicesError ,setInvoicesError] = useState(false)

  const [stats ,setStats] = useState({})

  const [statsLoading , setStatsLoading] = useState(false)

  const [statsError , setStatsError] = useState(false)



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

  // fetchQuatations
  const fetchQuatations = async () => {

    try
    {
      setQuatationsLoading(true)

      setQuatationsError(false)

      const res = await axios.get(url + "/api/quatation/get-quatations", {headers:{token}})

      if(res.data.success)
      {
        setQuatations(res.data.quatations)

        setQuatationsLoading(false)
      }

    }
    catch(error)
    {
      setQuatationsLoading(false)

      setQuatationsError(false)

      console.log(error.message)
    }

  }

  // fetchInvoices
  const fetchInvoices = async () => {

    try
    {
      setInvoicesLoading(true)

      setInvoicesError(false)

      const res = await axios.get(url + "/api/invoice/get-invoices",{headers:{token}})

      if(res.data.success)
      {
        setInvoicesLoading(false)

        setInvoices(res.data.invoices)
      }

    }
    catch(error)
    {

      setInvoicesLoading(false)

      setInvoicesError(true)
    }

  }

  // fetchStats
  const fetchStats = async () => {

    try
    {
        setStatsError(null)

        setStatsLoading(true)

        const res = await axios.get(url + `/api/stats/get-stat`,{headers:{token}})

        if(res.data.success)
        {
          setStatsLoading(false)

          setStats(res.data)
        }

    }
    catch(error)
    {

      setStatsError(true)

      setStatsLoading(false)

      console.log(error.message)
    }

  }


  useEffect(() => {

    if(localStorage.getItem("token"))
    {

      setToken(localStorage.getItem("token"))

      fetchProjects()

      fetchClients()

      fetchQuatations()

      fetchInvoices()

      fetchStats()
      
    }

  },[token])


  useEffect(() => {

    fetchClients()

    fetchProjects()

    fetchQuatations()

    fetchInvoices()

  },[])


   console.log(stats)

  // console.log(projects)

  // console.log(token)


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
    fetchProjects,
    quatations,setQuatations,
    quatationsLoading, setQuatationsLoading,
    quatationsError, setQuatationsError,
    fetchQuatations,
    invoices,setInvoices,
    invoicesLoading,setInvoicesLoading,
    invoicesError,setInvoicesError,
    fetchInvoices,
    stats, setStats,
    statsLoading, setStatsLoading,
    statsError, setStatsError,
    fetchStats,
  }
  

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
