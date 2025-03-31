

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import Delete from '../components/Delete'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import {IoMdAdd} from "react-icons/io"
import { Table, TableHead } from 'flowbite-react'
import Error from '../components/Error'
import { FaEdit, FaRegFilePdf, FaTrashAlt } from 'react-icons/fa'




export default function Invoivces() {

  const {url,token,invoices,setInvoices,invoicesLoading,invoicesError,fetchInvoices,openDelete,setOpenDelete} = useContext(StoreContext)

  const [loader ,setLoader] = useState([{},{},{},{},{}])

  const [invoice,setInvoice] = useState({})

  const [invoiceLoading ,setInvoiceLoading] = useState(false)

  const [invoiceError ,setInvoiceError] = useState(false)

  const [invoiceToDelete , setInvoiceToDelete] = useState("")

  const [filteredInvoices, setFilteredInvoices] = useState([])


  const navigate = useNavigate()


  // handleSearch
  const handleSearch = async (e) => {

    const searchInvoice = e.target.value 

    const filtered = invoices?.filter((invoice) => invoice.email.toLowerCase().includes(searchInvoice.toLowerCase()))

    setFilteredInvoices(filtered)

  }


  // handleDelete
  const handleDelete = async () => {

        try
        {
            const res = await axios.delete(url + `/api/invoice/delete-invoice/${invoiceToDelete}`,{headers:{token}})

            if(res.data.success)
            {
                setOpenDelete(false)

                setInvoices((prev) => 
                    prev.filter((invoice) => invoiceToDelete !== invoice._id )
                )

                toast.failure(`invoice deleted successfuly`)

            }

        }
        catch(error)
        {
            console.log(error.message)
            
        }

  }


  //fetchInvoice
  const fetchInvoice = async () => {

    try
    {
        setInvoiceLoading(true)

        setInvoiceError(false)

        const res = await axios.get(url + `/api/invoice/get-invoice/${invoiceToDelete}`)

        if(res.data.success)
        {

            setInvoice(res.data.invoice)

            setInvoiceLoading(false)
        }

    }
    catch(error)
    {
        setInvoiceError(true)

        setInvoiceLoading(false)

        console.log(error.message)
    }

  }


  useEffect(() => {

    fetchInvoice()

  },[invoiceToDelete])

  


  return (

    <>

        <div className="section space-y-6">

            {/* header */}
            <header className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">

                {/* title */}
                <div className="space-y-1 lg:space-y-2">

                    <h2 className="title2 text-primary">Invoices</h2>

                    <h4 className="text-xs md:text- lg:text-base text-slate-500">Track payments and send invoices instantly</h4>

                </div>

                <button className="button max-w-sm">

                    <Link to="/add-invoice" className="flex items-center gap-x-3">

                        <IoMdAdd size={24}/> Add invoice

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


            {/* invoices */}
            <div className="tabler">

                <Table>

                    <TableHead>

                        <Table.HeadCell>N.O</Table.HeadCell>

                        <Table.HeadCell>client</Table.HeadCell>

                        <Table.HeadCell>due</Table.HeadCell>

                        <Table.HeadCell>actions</Table.HeadCell>

                    </TableHead>

                    {!invoicesLoading && !invoicesError && ( 

                        <>

                            {invoices.length > 0 ? (

                                <>

                                    {invoices.map((invoice,index) => (


                                        <Table.Body key={index}>

                                            <Table.Row>

                                                <Table.Cell className="text-black font-semibold">{invoice?.invoiceNumber}</Table.Cell>

                                                <Table.Cell className="text-nowrap">{invoice?.client?.name}</Table.Cell>

                                                <Table.Cell>{new Date(invoice?.duePayment).toLocaleDateString()}</Table.Cell>

                                                <Table.Cell>

                                                    <div className="flex items-center gap-x-3">

                                                        <span className="cursor-pointer">
                                                            
                                                            <a href={invoice?.url} target='_blank' className="text-emerald-400">

                                                                <FaRegFilePdf size={20}/>

                                                            </a>

                                                        </span>

                                                        <span className="cursor-pointer text-blue" onClick={() => navigate(`/update-invoice/${invoice._id}`)}>

                                                            <FaEdit size={20}/>

                                                        </span>

                                                        <span 
                                                            className="text-red-500 cursor-pointer" 
                                                            onClick={() => {
                                                                
                                                                setOpenDelete(true)

                                                                setInvoiceToDelete(invoice._id)

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

                                        <Table.Cell colSpan={4} className="text-center text-xl font-semibold">
                                            There are no invoices yet !!!
                                        </Table.Cell>
                                        
                                    </Table.Row>

                                </Table.Body>

                            )}
                        
                        </>

                    )}

                    {invoicesLoading && !invoicesError && ( 
                        
                        <>

                        {loader.map((loader,index) => (

                            <Table.Body key={index}>

                                <Table.Row>

                                    <Table.Cell>
                                        
                                        <div className="h-7 w-7 rounded-md loading"/>

                                    </Table.Cell>

                                    <Table.Cell>

                                      <div className="h-10 w-24 rounded-md loading"/>

                                    </Table.Cell>

                                    <Table.Cell>

                                        <div className="h-10 w-20 rounded-md loading"/>

                                    </Table.Cell>

                                    <Table.Cell>

                                        <div className="flex items-center gap-x-3">

                                            <span className="h-7 w-7 rounded-full loading"/>

                                            <span className="h-7 w-7 rounded-full loading"/>

                                            <span className="h-7 w-7 rounded-full loading"/>

                                        </div>

                                    </Table.Cell>

                                </Table.Row>

                            </Table.Body>
                        ))}

                        </>

                    )}

                    {invoicesError && ( 

                        <Table.Body>

                            <Table.Row>

                                <Table.Cell colSpan={4}>

                                    <Error retry={fetchInvoices}/>

                                </Table.Cell>

                            </Table.Row>

                        </Table.Body>

                    )}

                </Table>

            </div>


        </div>

        {openDelete && (

            <Delete handleDelete={handleDelete} product={"Invoice"} item={invoice?.invoiceNumber}/>

        )}

    </>

  )

}
