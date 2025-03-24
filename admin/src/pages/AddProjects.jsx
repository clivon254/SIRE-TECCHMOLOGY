

import React, { Fragment, useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import axios from 'axios'
import {toast} from "sonner"
import { useNavigate } from 'react-router-dom'
import {Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react"
import { BsCheck, BsChevronBarExpand } from "react-icons/bs"
import clsx from "clsx"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Loading from '../components/Loading'
import {Alert} from "flowbite-react"



export default function AddProjects() {
  
  const {url,token,fetchProjects,clients} = useContext(StoreContext)

  const [formData ,setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const [error , setError] = useState(null)

  const navigate = useNavigate()

  const [selectedTools ,setSelectedTools] = useState([])

  const [tools,setTools] = useState(["React","Express","Node js","Mongo Db","PHP","Angular"])


  // handleChange
  const handleChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }

  
  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      setLoading(true)

      setError(null)

      const res = await axios.post(url + "/api/project/add-project",formData,{headers:{token}})

      if(res.data.success)
      {
        setLoading(false)

        toast.success(`${res.data.newProject.title} is successfully added`)

        navigate('/projects')

        fetchProjects()

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
        console.log(error.message)
      }

    }

  }


  // handleChangeSelectedTools
  const handleChangeSelectedTools = (el) => {

    setSelectedTools(el)

    setFormData({...formData , tools: el})

  }

  useEffect(() => {

    if(formData?.tools?.length < 1)
    {
      tools && setSelectedTools([tools[0]])
    }
    else
    {
      setSelectedTools(formData?.tools)
    }

  },[])

  return (

    <div className="section space-y-10">

      <h2 className="title2 text-center">Add Project</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mx-auto max-w-lg">

        {/* title */}
        <div className="flex flex-col gap-y-2">

            <label className="label">Title</label>

            <input 
              type="text" 
              placeholder='title'
              name="title"
              onChange={handleChange}
              value={formData?.title}
              className="input" 
            />
            
        </div>

        {/* client */}
        <div className="flex flex-col gap-y-2">

          <label  className="label">Clients</label>

          <select
            className="input"
            value={formData?.client}
            name="client"
            onChange={handleChange}
          >

            <option value="" >select a client</option>

            {clients?.map((client,index) => (

              <option key={index} value={client._id}>{client?.name}</option>

            ))}

          </select>

        </div>

        {/* start date */}
        <div className="flex flex-col gap-y-0">

            <label className="label">Start Date</label>

            <input 
              type="date" 
              placeholder='title'
              name="startDate"
              onChange={handleChange}
              value={formData?.startDate}
              className="input" 
            />
            
        </div>

        {/* due date */}
        <div className="flex flex-col gap-y-0">

            <label className="label">Due Date</label>

            <input 
              type="date" 
              placeholder='title'
              name="dueDate"
              onChange={handleChange}
              value={formData?.dueDate}
              className="input" 
            />
            
        </div>

        {/* tools */}
        <div className="">

          <label className="label">Tools</label>

          <Listbox
            value={selectedTools}
            onChange={(el) => handleChangeSelectedTools(el)}
            multiple
          >

            <div className="mt-1 relative">

              <ListboxButton className="relative w-full cursor-default rounded pl-1 pr-3 text-left px-3 py-4 2xl:py-6 border border-gray-600">

                <span className="">
                  {selectedTools?.map((tool) => tool).join(",")}
                </span>

                <span className="pointer-events-none absolute inset-y-0 right-0 pr-2">
                  <BsChevronBarExpand size={26}/>
                </span>

              </ListboxButton>

              <Transition
                 as={Fragment}
                 leave="transition ease-in duration-100"
                 leaveFrom="opacity-0"
                 className="border shadow-md"
              >

                <ListboxOptions>

                  {tools.map((tool,index) => (

                    <ListboxOption
                      key={index}
                      className={({active}) => 
                        `relative cursor-pointer select-none py-2 pl-10
                      ${active ? "bg-red-100" : "text-black"}`
                      }
                      value={tool}
                    >
                      {({selected}) => (

                        <>

                            <div 
                              className={clsx(
                                "flex items-center gap-2 truncate",
                                selected ? "font-medium": "font-normal"
                              )}
                            >

                              <span className="">{tool}</span>

                            </div>

                            {selected && (

                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">

                                <BsCheck className="h-5 w-5"/>

                              </span>

                            )}

                        </>

                      )}
                    </ListboxOption>

                  ))}

                </ListboxOptions>

              </Transition>

            </div>

          </Listbox>

        </div>

        {/* url */}
        <div className="flex flex-col gap-y-2">

            <label className="label">Url</label>

            <input 
              type="text" 
              placeholder='url'
              name="url"
              onChange={handleChange}
              value={formData?.url}
              className="input" 
            />
            
        </div>
        
        {/* description */}
        <div className="flex flex-col gap-y-2">

         <label  className="label">description</label>
          
          <textarea 
            type="text"
            name="description" 
            placeholder="type here . . . . "
            onChange={handleChange}
            vaue={formData.description}
            className="input"
          />

        </div>

        <button 
          type="submit"
          className="button"
          disabled={loading}
        >
          {loading ? 
          <Loading/> 
          : 
          "Add project"
          }
        </button>

        {error && (

          <Alert color="failure">{error}</Alert>

        )}

      </form>

    </div>

  )

}
