import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserHome from './pages/UserHome'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'




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

        <Route path='/captain-home' element ={
            <CaptainProtectedWrapper>
                <CaptainHome />
            </CaptainProtectedWrapper>
        } />

        <Route path ='/captain-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />

      </Routes>
    </div>
  )
}

export default App
