

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { Link } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import { Table } from 'flowbite-react'
import Delete from '../components/Delete'
import Error from '../components/Error'
import { FaEdit, FaStreetView, FaTrashAlt } from 'react-icons/fa'
import axios from "axios"




export default function Projects() {

    const {url,token,projects,projectsLoading,projectsError,fetchProjects,openDelete,setOpenDelete} = useContext(StoreContext)

    const [loader , setLoader] = useState([{},{},{},{}])

    const [project ,setProject] = useState({})

    const [projectLoading , setProjectLoading] = useState(false)

    const [projectError ,setProjectError] = useState(false)

    const [projectToDelete ,setProjectToDelete] = useState("")


    // fetchProject
    const fetchProject = async () => {

        try
        {
            setProjectLoading(true)

            setProjectError(false)

            const res = await axios.get(url + `/api/project/get-project/${projectToDelete}`)

            if(res.data.success)
            {
                setProjectLoading(false)

                setProject(res.data.project)
            }

        }
        catch(error)
        {
            setProjectError(true)

            setProjectLoading(false)

            console.log(error.message)
        }
        
    } 

   //handleSearch
   const handleSearch = () => {}


   //handleDelete
   const handleDelete = () => {} 


   useEffect(() => {

        fetchProject()

   },[projectToDelete])


  return (

    <section className="section space-y-10">

        {/* header */}
        <header className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">

            {/* title */}
            <div className="space-y-1 lg:space-y-2">

                <h2 className="title2 text-primary">Projects</h2>

                <h4 className="text-xs md:text- lg:text-base text-slate-500">Get information of the projects we are handling</h4>

            </div>

            <button className="button max-w-sm">

                <Link to="/add-project" className="flex items-center gap-x-3">

                    <IoMdAdd size={24}/> Add Projects

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

        {/* projects */}
        <div className="tabler">

            <Table>

                <Table.Head>

                    <Table.HeadCell></Table.HeadCell>

                    <Table.HeadCell>title</Table.HeadCell>

                    <Table.HeadCell>client</Table.HeadCell>

                    <Table.HeadCell>startDate</Table.HeadCell>

                    <Table.HeadCell>dueDate</Table.HeadCell>

                    <Table.HeadCell>actions</Table.HeadCell>

                </Table.Head>

                {!projectsLoading && !projectsError && (

                    <>

                        {projects.length > 0 ? 
                        (
                            <>

                                {projects.map((project,index) => (

                                    <Table.Body key={index}>

                                        <Table.Row>

                                            <Table.Cell>{index+1}.</Table.Cell>

                                            <Table.Cell className="truncate ">
                                                {project?.title}
                                            </Table.Cell>

                                            <Table.Cell className="text-nowrap">
                                                {project?.client?.name}
                                            </Table.Cell>

                                            <Table.Cell className="text-nowrap">
                                                {project?.startDate}
                                            </Table.Cell>

                                            <Table.Cell className="text-nowrap">
                                                {project?.dueDate}
                                            </Table.Cell>

                                            <Table.Cell>

                                                <div className="flex items-center gap-x-3">

                                                    <span className="">

                                                        <Link to={`/project/${project._id}`}>

                                                         <FaStreetView size={20}/>

                                                        </Link>

                                                    </span>

                                                    <span className="text-blue">

                                                        <Link to={`/update-project/${project._id}`}>

                                                            <FaEdit size={20}/>

                                                        </Link>

                                                    </span>

                                                    <span 
                                                        className="text-primary"
                                                        onClick={() => {

                                                            setProjectToDelete(project._id)

                                                            setOpenDelete(true)

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

                                    <Table.Cell colSpan={6} className="text-center text-xl font-semibold">

                                        There are not projects found !!!!

                                    </Table.Cell>

                                </Table.Row>

                            </Table.Body>
                        )}

                    </>

                )}

                {projectsLoading && !projectsError && (

                    <>

                        {loader?.map((load,index) => (

                            <Table.Body key={index}>

                                <Table.Row>

                                    <Table.Cell>{index+1}.</Table.Cell>

                                    <Table.Cell>
                                        <div className="rounded-full h-6 w-32 loading"/>
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

                {projectsError && (

                    <Table.Body>

                        <Table.Row>

                            <Table.Cell colSpan={6}>

                                <Error retry={fetchProjects}/>

                            </Table.Cell>

                        </Table.Row>

                    </Table.Body>

                )}

            </Table>

        </div>

        {openDelete && (

            <Delete />

        )}

    </section>

  )

}
