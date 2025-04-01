

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'

export default function Dashboard() {

  const {stats} = useContext(StoreContext)

  return (
    
    <section className="section space-y-6">

      {/* header */}
      <header className="flex flex-col gap-y-5 lg:flex-row lg:justify-between w-full">

        {/* title */}
        <div className="space-y-2">

          <h2 className="lg:title3 title2">Dashboard</h2>

          <h4 className="text-sm lg:text-base">Comprehnsive business insights at a glance</h4>

        </div>

        {/* CTA */}
        <div className="lg:w-[50%] grid grid-cols-2 gap-x-3 ">

          {/* projects */}
          <div className="space-y-2 shadow-lg p-2 border border-slate-200 rounded-md">

            <span className="block text-center ">Projects</span>

            <span className="block text-center text-primary font-bold text-2xl">{stats?.totalProjects}</span>

          </div>
 
          {/* clients */}
          <div className="space-y-2 shadow-lg p-2 border border-slate-200 rounded-md">

            <span className="block text-center">Clients</span>

            <span className="block text-center text-blue font-bold text-2xl">{stats?.totalClients}</span>

          </div>

        </div>

      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 gap-x-3">

        {/* clients */}
        <div className="shadow-md rounded-md p-2">

          {/* header */}
          <div className="flex justify-between items-center">

            <span className="title">Clients</span>

            <span className="bg-red-100 text-primary px-5 py-2 rounded-full text-sm font-semibold">total {stats.totalClients}</span>

          </div>

        </div>

        {/* project */}
        <div className=""></div>

        {/* invoice */}
        <div className=""></div>

      </div>

    </section>

  )

}
