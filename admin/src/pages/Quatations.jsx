import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Delete from '../components/Delete'

export default function Quatations() {

  const {url,token,quatations,setQuatations,quatationsLoading,quatationError,fetchQuatations,openDelete,setOpenDelete} = useContext(StoreContext)

  return (

    <>

        <div className="section">

            {/* header */}
            <header className="">

                
            </header>

            {/* search */}
            <div className=""></div>

            {/* table */}
            <div className=""></div>

        </div>
    
    </>

  )

}
