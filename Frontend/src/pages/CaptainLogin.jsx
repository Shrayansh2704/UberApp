import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});
    const submitHandler = (e)=>{
        e.preventDefault();
        setCaptainData({
            email : email,
            password : password
        });
        setEmail('');
        setPassword('')
    }
    
  return (
    <div className="bg-[#eeeeee] p-7 h-screen flex flex-col justify-between">
        <div>
            <img className="w-20  mb-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-YLcX0i8q5ERgL_YRQ3PQsvtA_mJXgVhnw&s" />
            <form onSubmit={(e)=>{
                submitHandler(e);
            }}>
                <h3 className="text-xl font-medium mb-2">What's Your Email?</h3>
                <input className="bg-[#aeaeae] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                    type="email" 
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    placeholder='email@example.com' 
                    required />
                <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
                <input className="bg-[#aeaeae] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                    type="password" 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    placeholder='password' 
                    required />
                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Login</button>
                <p className="text-center">Join a Fleet? <Link to='/captain-signup' className="text-blue-600 ">Register as a Captain <span>→</span></Link></p>
            </form>
        </div>
        <div> 
            <Link 
                to='/user-login' 
                className="flex items-center justify-center bg-[#f3c164] text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">
                    Sign in as User
            </Link>
        </div>
    </div>
  )
}

export default CaptainLogin
