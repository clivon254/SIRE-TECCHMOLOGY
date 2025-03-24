

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { NavLink } from 'react-router-dom'

export default function DashSidebar() {
  
  const {Navlinks, setNavlinks,setOpen} = useContext(StoreContext)

  return (

    <div className="w-full p-3">

      <nav className="flex flex-col gap-y-5">

        {Navlinks.map((nav,index) => (

          <NavLink
            key={index}
            to={`${nav.path}`}
            onClick={() => setOpen(false)}
            className={({isActive}) => isActive ? "active-nav-link" :"nav-link"}
          >

            <span className="">{nav.icon}</span> {nav.title}

          </NavLink>

        ))}

      </nav>

    </div>

  )

}
