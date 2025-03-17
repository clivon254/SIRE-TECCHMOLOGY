

import React, { createContext, useState } from 'react'


export const StoreContext = createContext(null)



export default function StoreContextProvider(props) {


  const [openDelete,setOpenDelete] = useState()


  const contextValue = {
    openDelete , setOpenDelete
  }
  

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )

}
