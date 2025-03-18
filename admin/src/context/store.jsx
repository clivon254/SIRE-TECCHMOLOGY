

import React, { createContext, useState } from 'react'


export const StoreContext = createContext(null)



export default function StoreContextProvider(props) {


  const url = "http://localhost:2700"

  const [token, setToken] = useState("")

  const [open ,setOpen] = useState(false)

  const [openDelete,setOpenDelete] = useState(false)


  


  const contextValue = {
    url,
    token,setToken,
    open,setOpen,
    openDelete , setOpenDelete
  }
  

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
