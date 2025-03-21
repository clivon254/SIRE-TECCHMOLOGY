

import React, { useContext } from 'react'
import LOGOO from "../assets/SIRELOGO.png"
import { StoreContext } from '../context/store'
import {MdClose,MdMenu} from "react-icons/md"
import { Avatar, Dropdown } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DashSidebar from './DashSidebar'
import { signOutSuccess } from '../redux/user/userSlice'


export default function Header() {

    const {open,setOpen} = useContext(StoreContext)

    const {currentUser} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleSignout
    const handleSignOut = () => {

        localStorage.removeItem("token")

        dispatch(signOutSuccess())

        navigate('/')
        
    }

  return (

    <>

        <header className="p-2 w-full border-b-2 border-slate-500">

            <div className="flex items-center justify-between">

                {/* toggle */}
                <div className="lg:hidden cursor-pointer">

                    <button className="">
                        {open 
                            ? 
                            (
                                <MdClose
                                    size={32} 
                                    onClick={() => setOpen(true)}
                                />
                            ) 
                            : 
                            (
                                <MdMenu 
                                    size={32} 
                                    onClick={() => setOpen(true)}
                                />
                            )
                        }
                    </button>

                </div>

                {/* logo */}
                <div className="h-12 w-36 lg:h-12 lg:w-48">

                    <img 
                        src={LOGOO} 
                        alt="" 
                        className="h-full w-full" 
                    />

                </div>

                {/* dropdown */}
                <div className="">

                    <Dropdown
                        inline
                        arrowIcon={false}
                        label={
                            <Avatar
                                alt="user"
                                img={currentUser?.profilePicture}
                                rounded
                            />
                        }
                    >


                        <Dropdown.Header>

                            <span className="block">{currentUser?.username}</span>

                            <span className="block">{currentUser?.email}</span>

                        </Dropdown.Header>

                        <Link to="/profile">

                            <Dropdown.Item>Profile</Dropdown.Item>

                        </Link>

                        <Dropdown.Item onClick={() => handleSignOut()}>
                            Sign out
                        </Dropdown.Item>

                    </Dropdown>

                </div>

            </div>

        </header>
        
        {/* drawer */}
        <div className={`w-full h-full fixed top-0 bg-black/50 backdrop-blur-sm origin-left transition-all duration-200 ease-in lg:hidden overflow-hidden z-50 ${open ? "left-0" : "left-[-100%]"}`}>
                
            <div className="absolute left-0 w-[60%] h-full bg-white space-y-6 overflow-y-scroll px-3">

                {/* toggle button */}
                <div className="flex justify-end">

                    <span className="cursor-pointer" onClick={() => setOpen(false)}>

                        <MdClose size={30} />

                    </span>

                </div>

                <img 
                    src={LOGOO}
                    alt="" 
                    className="h-16 w-48" 
                />

                <DashSidebar />

            </div>

        </div>
    
    </>

  )

}
