import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import Delete from '../components/Delete'
import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import {Table} from "flowbite-react"
import axios from 'axios'
import Error from '../components/Error'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { toast } from 'sonner'



export default function Quatations() {

  const {url,token,quatations,setQuatations,quatationsLoading,quatationsError,fetchQuatations,openDelete,setOpenDelete} = useContext(StoreContext)

  const [loader ,setLoader] = useState([{},{},{},{}])

   const [quatationToDelete, setQuatationToDelete] = useState("")
   
   const [quatation ,setQuatation] = useState({})

   const [quatationLoading ,setQuatationLoading] = useState(false)

   const [quatationError , setQuatationError] = useState(false) 


   // handleSearch
   const handleSearch = (e) => {

        const searchQuatation = e.target.value 

        const filtered = Quatations?.filter((quatation) => quatation.number.toLowerCase().includes(searchQuatation.toLowerCase()))

        setFilteredClients(filtered)

    }

    // handleDelete
    const handleDelete = async () => {

        try
        {

            const res = await axios.delete(url + `/api/quatation/delete-quatation/${quatationToDelete}`,{headers:{token}})

            if(res.data.success)
            {
                setOpenDelete(false)

                setQuatations((prev) => 
                 prev.filter((quatation) => quatation._id !== quatationToDelete))
                
                toast.error("quatation is deleted successfully")
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // fetchQuatation
    const fetchQuatation = async () => {

        try
        {
            setQuatationLoading(true)

            setQuatationError(false)

            const res = await axios.get(url + `/api/quatation/get-quatation/${quatationToDelete}`)

            if(res.data.success)
            {
                setQuatation(res.data.quatation)

                setQuatationLoading(false)
            }
        }
        catch(error)
        {
            setQuatationError(true)

            setQuatationLoading(false)

            console.log(error.message)
        }

    }

    useEffect(() => {

        fetchQuatation()

    },[quatationToDelete])

  return (

    <>

        <div className="section space-y-6">

            {/* header */}
            <header className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">

                {/* title */}
                <div className="space-y-1 lg:space-y-2">

                    <h2 className="title2 text-primary">Quations</h2>

                    <h4 className="text-xs md:text- lg:text-base text-slate-500">send quatation to clients instantly</h4>

                </div>

                <button className="button max-w-sm">

                    <Link to="/add-quatation" className="flex items-center gap-x-3">

                        <IoMdAdd size={24}/> Add Quatation

                    </Link>
                    
                </button>

            </header>

            {/* search */}
            <div className="flex justify-between items-center gap-x-5">

                <input 
                    type="text" 
                    className="input max-w-sm w-full" 
                    placeholder="enter email . . . . "
                    onChange={handleSearch}
                />

                <button className="button2 max-w-md">
                    search
                </button>

            </div>

            {/* table */}
            <div className="tabler">

                <Table>

                    <Table.Head>

                        <Table.HeadCell>N.O</Table.HeadCell>

                        <Table.HeadCell>Client</Table.HeadCell>

                        <Table.HeadCell className="text-nowrap">valid until</Table.HeadCell>

                        <Table.HeadCell>Actions</Table.HeadCell>

                    </Table.Head>

                    {!quatationsError && !quatationsLoading && ( 
                        <>

                            {quatations?.length > 0 ? (
                            
                                <>

                                    {quatations.map((quatation,index) => (

                                        <Table.Body key={index}>

                                            <Table.Row>

                                                <Table.Cell className="font-semibold text-black">
                                                    {quatation?.number}
                                                </Table.Cell>

                                                <Table.Cell className="text-nowrap text-red-600 font-bold">
                                                    {quatation?.client?.name}
                                                </Table.Cell>

                                                <Table.Cell className="text-nowrap text-orange-400">
                                                    {new Date(quatation?.validUntil).toLocaleString()}
                                                </Table.Cell>

                                                <Table.Cell>

                                                    <div className="flex items-center gap-x-3">


                                                        <span className="">

                                                            <Link to={`/update-quatation/${quatation?._id}`}>

                                                                <FaEdit size={20}/>

                                                            </Link>

                                                        </span>

                                                        <span 
                                                            className="text-red-500"
                                                            onClick={() => {

                                                                setOpenDelete(true)

                                                                setQuatationToDelete(quatation?._id)

                                                            }}
                                                        >

                                                            <FaTrashAlt size={20}/>

                                                        </span>

                                                    </div>

                                                </Table.Cell>

                                                

                                            </Table.Row>

                                        </Table.Body>

                                    ))}

                                </>
                            ) 
                            : 
                            (
                                <Table.Body>

                                    <Table.Row>

                                        <Table.Cell colSpan={4} className="text-xl text-center font-semibold">
                                            There are no quatations yet !!!!
                                        </Table.Cell>

                                    </Table.Row>

                                </Table.Body>
                            )}

                        </>
                    )}

                    {!quatationsError && quatationsLoading && ( 

                       <>
                            {loader.map((load,index) => (

                                <Table.Body key={index}>

                                    <Table.Row>

                                        <Table.Cell>
                                            <div className="rounded-md h-10 w-6 loading"/>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="rounded-md h-10 w-20 loading"/>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="rounded-md h-10 w-20 loading"/>
                                        </Table.Cell>

                                        <Table.Cell>

                                            <div className="flex items-center justify-between">

                                                <span className="rounded-full h-7 w-7 loading"/>

                                                <span className="rounded-full h-7 w-7 loading"/>

                                                <span className="rounded-full h-7 w-7 loading"/>

                                            </div>

                                        </Table.Cell>

                                    </Table.Row>

                                </Table.Body>

                            ))}
                       </>

                    )}

                    {quatationsError && ( 

                        <Error retry={fetchQuatations}/>

                    )}

                </Table>

            </div>

        </div>
    

        {openDelete && (

            <Delete handleDelete={handleDelete} product={"quatation"} item={quatation?.number} />

        )}
    </>

  )

}
