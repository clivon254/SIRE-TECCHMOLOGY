
import React from 'react'
import {BrowserRouter,Routes,Route,Outlet, Navigate} from "react-router-dom"
import {Toaster} from "sonner"
import {useSelector} from "react-redux"
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import DashSidebar from './components/DashSidebar'
import Header from './components/Header'
import Profile from './pages/Profile'
import Clients from './pages/Clients'
import AddClients from './pages/AddClients'
import UpdateClients from './pages/UpdateClients'
import ClientPage from './pages/ClientPage'
import Projects from './pages/Projects'
import AddProjects from './pages/AddProjects'
import ProjectPage from './pages/ProjectPage'
import UpdateProject from './pages/UpdateProject'




const LayOut = () => {

  const {currentUser} = useSelector(state => state.user)

  return (

    currentUser?.isAdmin ? 

    <div className="w-full h-screen flex flex-col">
      
      <Header/>

      <div className="w-full h-full flex lg:divide-x-2 divide-slate-500">

        {/* sidebar */}
        <div className="hidden lg:flex w-[20%] overflow-y-auto">

          <DashSidebar/>

        </div>

        {/* main side */}
        <div className="w-full lg:w-[80%] overflow-y-scroll overflow-hidden">

          <Outlet />

        </div>

      </div>

    </div>

    :

    <Navigate to="/sign-in"/>

  )

}


export default function App() {

  return (

    <BrowserRouter>
    

      <main className="w-full  min-h-screen">

          <Toaster richColors/>

          <Routes>

            <Route element={<LayOut/>}>

                <Route path="/" element={<Dashboard/>}/>

                <Route path="/profile" element={<Profile/>}/>

                <Route path="/clients" element={<Clients/>}/>

                <Route path="/add-client" element={<AddClients/>}/>

                <Route path="/update-client/:clientId" element={<UpdateClients/>}/>

                <Route path="/client/:clientId" element={<ClientPage/>}/>

                <Route path="/projects" element={<Projects/>}/>

                <Route path="/add-project" element={<AddProjects/>}/>

                <Route path="/update-project/:projectId" element={<UpdateProject/>}/>

                <Route path="/project/:projectId" element={<ProjectPage/>}/>

            </Route>

            <Route path="/sign-in" element={<SignIn/>}/>

            <Route path="/sign-up" element={<SignUp/>}/>

            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          </Routes>
        
      </main>
    
    </BrowserRouter>

  )
  
}
