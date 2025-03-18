
import React from 'react'
import {BrowserRouter,Routes,Route,Outlet, Navigate} from "react-router-dom"
import {Toaster} from "sonner"
import {useSelector} from "react-redux"
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'




const LayOut = () => {

  const {currentUser} = useSelector(state => state.user)

  return (

    currentUser?.isAdmin ? 

    <div className="">
      
      <Outlet />

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
