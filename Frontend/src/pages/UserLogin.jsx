import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('');
    
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
        <div>
            <img className="w-30  mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
            <form>
                <h3 className="text-xl font-medium mb-2">What's Your Email?</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" type="email" placeholder='email@example.com' required />
                <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" placeholder='password' required />
                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Login</button>
                <p className="text-center">New Here? <Link to='/user-signup' className="text-blue-600 ">Create new Account <span>→</span></Link></p>
            </form>
        </div>
        <div>
            <button className="bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base">Sign in as Captain</button>
        </div>
    </div>
  )
}

export default UserLogin
