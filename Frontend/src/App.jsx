import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserHome from './pages/UserHome'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import { User } from 'lucide-react'
import UserLogout from './pages/UserLogout'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Start />} />
        <Route path='/user-login' element = {<UserLogin />} />
        <Route path='/user-signup' element = {<UserSignup />} />
        <Route path='/captain-login' element = {<CaptainLogin />} />
        <Route path='/captain-signup' element = {<CaptainSignup />} />
        <Route path='/user-home' element ={
            <UserProtectedWrapper>
                <UserHome />
            </UserProtectedWrapper>
        } />
        <Route path ='/user-logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App
