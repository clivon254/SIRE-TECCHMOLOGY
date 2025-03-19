

import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/store'
import { Table } from "flowbite-react"
import Error from '../components/Error'
import { getInitials, getProducts } from '../utils'
import { FaEdit, FaRegEye, FaStopCircle, FaTrashAlt } from "react-icons/fa"
import Delete from '../components/Delete'
import axios from 'axios'
import { toast } from 'sonner'
import Pagination from '../components/Pagination'



export default function Clients() {

    const {url,clients,setClients,clientsLoading,clientsError,fetchClients,openDelete,setOpenDelete} = useContext(StoreContext)

    const [loader, setLoader] = useState([
        {},{},{},{},{}
    ])

    const [clientToDelete, setClientToDelete] = useState("")

    const [client ,setClient] = useState({})

    const [clientLoading ,setClientLoading] = useState(false)

    const [clientError , setClientError] = useState(false)

    const [filteredCients ,setFilteredClients] = useState(clients)


    // handleSearch
    const handleSearch = (e) => {

        const searchClient = e.target.value 

        const filtered = clients?.filter((client) => client.email.toLowerCase().includes(searchClient.toLowerCase()))

        setFilteredClients(filtered)

    }


    // fetchClient
    const fetchClient = async () => {

        try
        {
            setClientLoading(true)

            setClientError(false)

            const res = await axios.get(url + `/api/client/get-client/${clientToDelete}`)

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
            const res = await axios.delete(url + `/api/client/delete-client/${clientToDelete}`)

            if(res.data.suucess)
            {
                setOpenDelete(false)

                setClients((prev) => 
                    prev.filter(client => client._id !== clientToDelete)
                )

                toast.error(`${client?.name} is deleted successfully`)

            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    
    // PAGINATION
    const [page ,setPage] = useState(1)

    const [limit ,setLimit] = useState(5)

    const finalClients = getProducts(page,limit,filteredCients)

    const finalLength = finalClients?.length

    const totalPage = Math.ceil(finalLength / limit)



    useEffect(() => {

        fetchClient()

    },[clientToDelete])

    
    useEffect(() => {

        setFilteredClients(clients)

    },[])

  return (

    <>

        <div className="section space-y-6 ">

            {/* header */}
            <header className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">

                {/* title */}
                <div className="space-y-1 lg:space-y-2">

                    <h2 className="title2 text-primary">Clients</h2>

                    <h4 className="text-xs md:text- lg:text-base text-slate-500">Detailed information about the clients</h4>

                </div>

                <button className="button max-w-sm">

                    <Link to="/add-client" className="flex items-center gap-x-3">

                        <IoMdAdd size={24}/> Add clients

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

            {/* client */}
            <div className="tabler">

                <Table>

                    <Table.Head>

                        <Table.HeadCell></Table.HeadCell>

                        <Table.HeadCell></Table.HeadCell>

                        <Table.HeadCell>name</Table.HeadCell>

                        <Table.HeadCell>email</Table.HeadCell>

                        <Table.HeadCell>phone</Table.HeadCell>

                        <Table.HeadCell>actions</Table.HeadCell>

                    </Table.Head>

                    {!clientsLoading && !clientsError && (

                        <>

                            {finalClients.length > 0 ? (

                                <>

                                    {finalClients.map((client,index) => (

                                        <Table.Body key={index}>

                                            <Table.Row>

                                                <Table.Cell>{index+1}.</Table.Cell>

                                                <Table.Cell>

                                                    <div className="w-10 h-10 bg-red-50 text-primary flex items-center justify-center rounded-full text-xl font-bold p-1">
                                                        {getInitials(client.name)}
                                                    </div>

                                                </Table.Cell>

                                                <Table.Cell className="text-nowrap">
                                                    {client?.name}
                                                </Table.Cell>

                                                <Table.Cell className="text-nowrap">
                                                    {client?.email}
                                                </Table.Cell>

                                                <Table.Cell className="text-nowrap">
                                                    {client?.phone}
                                                </Table.Cell>

                                                <Table.Cell>

                                                    <div className="flex items-center gap-x-2">

                                                        <span className="">

                                                            <Link to={`/client/${client._id}`}>

                                                                <FaRegEye className="text-blue" size={20}/>

                                                            </Link>

                                                        </span>

                                                        <span className="cursor-pointer">

                                                            <Link to={`/update-client/${client._id}`}>

                                                                <FaEdit size={20}/>
                                                            
                                                            </Link>

                                                        </span>

                                                        <span
                                                            className=""
                                                            onClick={() => {
                                                                setOpenDelete(true)
                                                                setClientToDelete(client._id)
                                                            }}
                                                        >
                                                            <FaTrashAlt className="text-primary" size={20}/>
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

                                        <Table.Cell colSpan={6} className="text-center text-xl">
                                            There are no clients found !!!1
                                        </Table.Cell>

                                    </Table.Row>

                                </Table.Body>
                            )}

                        </>

                    )}

                    {clientsLoading && !clientsError && ( 

                        <>

                            {loader.map((load,index) => (

                                <Table.Body key={index}>

                                    <Table.Row>

                                        <Table.Cell>{index+1}.</Table.Cell>

                                        <Table.Cell>
                                            <div className="rounded-full h-10 w-10 loading"/>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="h-6 w-24 rounded-md loading"/>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="h-6 w-24 rounded-md loading"/>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="h-6 w-24 rounded-md loading"/>
                                        </Table.Cell>


                                        <Table.Cell>

                                            <div className="flex items-center gap-x-1">

                                                <span className="h-8 w-8 rounded-full loading"/>

                                                <span className="h-8 w-8 rounded-full loading"/>

                                                <span className="h-8 w-8 rounded-full loading"/>

                                            </div>

                                        </Table.Cell>

                                    </Table.Row>

                                </Table.Body>

                            ))}

                        </>

                    )}

                    { clientsError && (

                        <Table.Body>

                            <Table.Row>

                                <Table.Cell colSpan={6}>

                                    <Error retry={fetchClients}/>

                                </Table.Cell>

                            </Table.Row>

                        </Table.Body>

                    )}

                </Table>

            </div>

        </div>

        <Pagination totalPage={totalPage} page={page} setPage={setPage} limit={limit} siblings={1}/>

        {openDelete && (

            <Delete handleDelete={handleDelete} product={"Client"} item={client?.name}/>

        )}

    </>

  )

}
