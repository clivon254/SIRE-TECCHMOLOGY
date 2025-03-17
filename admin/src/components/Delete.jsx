

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import {HiExclamationCircle} from "react-icons/hi"



export default function Delete({product,item,handleDelete}) {

    const {setOpenDelete} = useContext(StoreContext)

  return (

    <div className="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-black/50 backdrop-blur-sm">

        <div className="space-y-5 p-4 w-[80%] lg:w-[40%] 2xl:w-[30%] 2xl:mx-auto shadow-md transition-all duration-500 ease-in rounded-md">

            <HiExclamationCircle size={50} className="mx-auto"/>

            <h2 className="">
                Are you sure you want to delete {product},{item} ?
            </h2>

            <div className="flex justify-around items-center gap-x-4">

                <button 
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xl hover:bg-red-600 disabled:cursor-not-allowed cursor-pointer disabled:bg-red-600/80"
                    onClick={() => handleDelete()}
                >
                    Yes , I am Sure
                </button>

                <button  
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xl hover:bg-black disabled:cursor-not-allowed cursor-pointer disabled:bg-black/80"
                    onClick={() => setOpenDelete(false)}
                >
                    No , Cancel
                </button>

            </div>

        </div>

    </div>

  )

}
