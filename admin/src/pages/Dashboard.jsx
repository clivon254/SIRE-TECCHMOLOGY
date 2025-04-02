

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'

export default function Dashboard() {

  const {stats} = useContext(StoreContext)

  console.log(stats)

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

            <span className="block text-center text-sm font-semibold">Projects</span>

            <span className="block text-center text-primary font-bold text-2xl">{stats?.totalProjects}</span>

          </div>
 
          {/* clients */}
          <div className="space-y-2 shadow-lg p-2 border border-slate-200 rounded-md">

            <span className="block text-center text-sm font-semibold">Clients</span>

            <span className="block text-center text-blue font-bold text-2xl">{stats?.totalClients}</span>

          </div>

        </div>

      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-3 gap-x-5">

        {/* clients */}
        <div className="shadow-md rounded-md p-2  space-y-3 border border-slate-200">

          {/* header */}
          <div className="flex justify-between items-center">

            <span className="title">Clients</span>

            <span className="bg-red-100 text-primary px-5 py-2 rounded-full text-sm font-semibold">total {stats.totalClients}</span>

          </div>

          <div className="flex justify-between items-center">

            <span className="font-semibold">Total clients</span>

            <span className="text-sm">{stats?.totalClients || 0}</span>

          </div>

          <div className="flex justify-between items-center">

            <span className="font-semibold">Possible clients</span>

            <span className="text-sm">{stats?.totalClients || 0}</span>

          </div>

          <h2 className="font-bold">Latest clients</h2>

          {stats?.last5Clients?.map((client,index) => (

            <div key={index} className="flex justify-between items-center text-sm lg:text-xs">

              <span className="">{client?.name}</span>

              <span className="truncate">{client?.email}</span>

            </div>

          ))}


        </div>

        {/* project */}
        <div className="shadow-md rounded-md p-2 space-y-3 border border-slate-200">

          {/* header */}
          <div className="flex justify-between items-center bgblu">

            <span className="title">Projects</span>

            <span className="bg-indigo-50 text-blue px-5 py-2 rounded-full text-sm font-semibold">total {stats.totalProjects}</span>

          </div>

          <div className="flex justify-between items-center">

            <span className="font-semibold">Total projects</span>

            <span className="text-sm">{stats?.totalProjects || 0}</span>

          </div>

          <div className="flex justify-between items-center">

            <span className="font-semibold">Total projects</span>

            <span className="text-sm">{ 0}</span>

          </div>

          <h2 className="font-bold">Latest projects</h2>

          {stats?.last5Projects?.map((project,index) => (

            <div key={index} className="flex justify-between items-center text-sm lg:text-xs">

              <span className="">{project?.title}</span>

            </div>

          ))}

        </div>

        {/* invoice */}
        <div className="shadow-md rounded-md p-2 space-y-3 border border-slate-200">

          {/* header */}
          <div className="flex justify-between items-center">

            <span className="title">Invoices</span>

            <span className="bg-teal-100 text-green px-5 py-2 rounded-full text-sm font-semibold">total {stats.totalClients}</span>

          </div>

          <div className=""></div>

        </div>

      </div>

    </section>

  )

}
