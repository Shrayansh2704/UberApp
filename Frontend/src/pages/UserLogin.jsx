import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useContext} from 'react';
import { UserDataContext } from '../context/UserContext';

const URL = import.meta.env.VITE_BASE_URL;

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserDataContext);

    const submitHandler = async(e)=>{
        e.preventDefault();
        const userData = {
            email : email,
            password : password
        }

        const response = await axios.post(`${URL}/users/login`, userData);

        if(response.status === 200){
            const data = response.data;
            setUser(data.user);
            navigate('/home');
        }

        setEmail('');
        setPassword('');
    }
    
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
        <div>
            <img className="w-30  mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
            <form onSubmit={(e)=>{
                submitHandler(e);
            }}>
                <h3 className="text-xl font-medium mb-2">What's Your Email?</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                    type="email" 
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    placeholder='email@example.com' 
                    required />
                <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                    type="password" 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    placeholder='password' 
                    required />
                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Login</button>
                <p className="text-center">New Here? <Link to='/user-signup' className="text-blue-600 ">Create new Account <span>→</span></Link></p>
            </form>
        </div>
        <div>
            <Link 
                to='/captain-login' 
                className="flex items-center justify-center bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">
                    Sign in as Captain
            </Link>
        </div>
    </div>
  )
}

export default UserLogin
