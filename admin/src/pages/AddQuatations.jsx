

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Loading from '../components/Loading'
import { Alert, Table } from 'flowbite-react'
import { FaTrashAlt } from 'react-icons/fa'

export default function AddQuatations() {

  const {url,token,clients,fetchQuatations} = useContext(StoreContext)

  const [formData , setFormData] = useState({
    items:[]
  })

  const [currentState,setCurrentState] = useState({})

  const [loading , setLoading] = useState(false)

  const [itemsLoading , setItemsLoading] = useState(false)

  const [itemsError , setItemsError] = useState(null)

  const [error , setError] = useState(null)

  const navigate = useNavigate()

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData ,[e.target.name]:e.target.value})

  }

  // handleItemsChange
  const handleItemsChange = (e) => {

    const {name,value} = e.target 

    // Convert the value to a number if the input type is "number"
    const newValue = (name === "quantity" || name === "price") ? Number(value) : value;

    setCurrentState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      setLoading(true)

      setError(null)

      const res = await axios.post(url + "/api/quatation/generate-quatation",formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        navigate(-1)

        fetchQuatations()

        toast.success(`quatation ${res.data.newQuatation.number} is generated successfully`)

      }

    }
    catch(error)
    {

      setLoading(false)

      if(error.response)
      {
        const errorMessage = error.response.data.message 

        setError(errorMessage)
      }
      else
      {
        setError(error.message)
      }

    }

  }

  // handleAddItem
  const handleAddItem = async () => {

      if(currentState?.id !== "" || currentState?.description !== "" || currentState?.quantity !== ""  || currentState?.price !== "" || 
        !currentState?.id || !currentState?.description || !currentState?.quantity || !currentState?.price)
      {
          setItemsError("please fill up all the places")
      }

      try
      {
        setItemsError(null)

        // Update formData with the new item
        setFormData((prevFormData) => ({
          ...prevFormData,
          items: [...(prevFormData.items || []), currentState], // Ensure items is an array
        }));

        setCurrentState({})

        toast.success("Item added successfully")


      }
      catch(error)
      {

        console.log(error.message)

        setItemsError(error.message)

      }

  }

  // handleRemoveItem
  const handleRemoveItem = async (index) => {

    setFormData({
      ...formData,
      items:formData?.items?.filter((_,i) => i !== index)
    })

    toast.error("item removed")

  }


  console.log(formData)

  console.log(currentState)

  return (

    <div className="section space-y-7">

      <h1 className="title2 text-center text-primary">Generate Quatation</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

        {/* client */}
        <div className="flex flex-col gap-y-1">

          <label className="label">Client</label>

          <select 
            name="client" 
            onChange={handleChange} 
            className="input"
            value={formData?.client}
          >

            <option  className="">select a client</option>

            {clients?.map((client,index) => (

              <option key={index} value={client._id} className="">{client?.name}</option>

            ))}

          </select>

        </div>

        {/* description */}
        <div className="flex flex-col gap-y-1">

          <label htmlFor="" className="label">Description</label>

          <textarea 
            name="description" 
            placeholder='type description here . . . . '
            onChange={handleChange}
            value={formData?.description}
            className="input h-80"
          />

        </div>

        {/* Items */}
        <div className="flex flex-col gap-y-2">
          
          {/* table */}
          {formData?.items?.length > 0 && (

            <div className="border-2 border-slate-700 p-2 rounded-md">

              <h2 className="text-sm font-semibold text-center">ITEMS</h2>

              <div className="tabler">

                <Table>

                  <Table.Head>

                    <Table.HeadCell>ID</Table.HeadCell>

                    <Table.HeadCell>description</Table.HeadCell>

                    <Table.HeadCell>quantity</Table.HeadCell>

                    <Table.HeadCell>price</Table.HeadCell>

                    <Table.HeadCell>Action</Table.HeadCell>

                  </Table.Head>

                  {formData?.items?.map((item,index) => (

                    <Table.Body key={index}>

                      <Table.Row>

                        <Table.Cell className="text-black font-semibold">{item?.id}</Table.Cell>

                        <Table.Cell className="text-nowrap">{item?.description}</Table.Cell>

                        <Table.Cell>{item?.quantity}</Table.Cell>

                        <Table.Cell>{item?.price}</Table.Cell>

                        <Table.Cell>

                          <span className="text-red-600" onClick={() => handleRemoveItem(index)}>
                            <FaTrashAlt size={20}/>
                          </span>

                        </Table.Cell>

                      </Table.Row>

                    </Table.Body>

                  ))}

                </Table>

              </div>

            </div>

          )}

          <label className="label">Add Items</label>

          {/* adding */}
          <div className="flex flex-col gap-y-2">
            
            {/* inputs */}
            <div className="grid grid-cols-2 gap-1">

                {/* id */}
                <input 
                  type="text" 
                  placeholder="id"
                  value={currentState?.id}
                  name="id"
                  onChange={handleItemsChange}
                  className="input" 
                />

                {/* description */}
                <input 
                  type="text" 
                  placeholder="items description"
                  value={currentState?.description}
                  name="description"
                  onChange={handleItemsChange}
                  className="input" 
                />

                {/* quantity */}
                <input 
                  type="number" 
                  placeholder="quantity"
                  value={currentState?.quantity}
                  name="quantity"
                  onChange={handleItemsChange}
                  className="input" 
                />

                {/* price */}
                <input 
                  type="Number" 
                  placeholder="price"
                  value={currentState?.price}
                  name="price"
                  onChange={handleItemsChange}
                  className="input" 
                />

            </div>

            {/* buttons */}
            <div className="">

              <button 
                className="button2 mx-auto max-w-md"
                type="button"
                onClick={handleAddItem}
              >
                Add Item
              </button>

            </div>

          </div>

          {itemsError && (

            <Alert color="failure">{itemsError}</Alert>

          )}

        </div>

        {/* validUntil */}
        <div className="flex flex-col gap-y-1">

          <label htmlFor="" className="label">Valid until</label>

          <input 
            type="date"
            name="validUntil"
            onChange={handleChange} 
            value={formData?.validUntil}
            className="input" 
          />

        </div>

        {/* additional cost */}
        <div className="flex flex-col gap-y-1">

          <label className="label">Additonal Cost</label>

          <textarea 
            name="additionalCost" 
            placeholder='type additional cost here . . . . '
            onChange={handleChange}
            value={formData?.additionalCost}
            className="input h-80"
          />

        </div>

        {/* payment schedule */}
        <div className="flex flex-col gap-y-1">

          <label htmlFor="" className="label">Payment Schedule</label>

          <textarea 
            name="paymentSchedule" 
            placeholder='type payment schedule here . . . . '
            onChange={handleChange}
            value={formData?.paymentSchedule}
            className="input h-80"
          />

        </div>

        {/* waranty*/}
        <div className="flex flex-col gap-y-1">

          <label htmlFor="" className="label">Warranty</label>

          <textarea 
            name="warranty" 
            placeholder='type warranty here . . . . '
            onChange={handleChange}
            value={formData?.warranty}
            className="input h-80"
          />

        </div>

        {/* terms and condition */}
        <div className="flex flex-col gap-y-1">

          <label htmlFor="" className="label">Terms And Condition</label>

          <textarea 
            name="termsAndCondition" 
            placeholder='type terms and condition here . . . . '
            onChange={handleChange}
            value={formData?.termsAndCondition}
            className="input h-80"
          />

        </div>

        {error && (

          <Alert color="failure">{error}</Alert>

        )}
        
        <button 
          className="button"
          disabled={loading}
          type="submit"
        >
          {loading ? <Loading/> : 'Submit'}
        </button>

      </form>

    </div>

  )
}
