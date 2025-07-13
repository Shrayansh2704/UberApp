import React from 'react'
import { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

const URL = import.meta.env.VITE_BASE_URL;

const UserSignup = () => {
    const [firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');


    const navigate = useNavigate();

    const {user, setUser} = useContext(UserDataContext);

    const submitHandler = async(e)=>{
        e.preventDefault();
        const newUser = {
            fullName :{
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        }

        const response = await axios.post(`${URL}/users/register`, newUser);

        if(response.status === 201){
            const data = response.data;
            setUser(data.user);
            navigate('/home');
        }

        setFirstName('');
        setLastName('');
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
                <h3 className="text-xl font-medium mb-2">What's Your Name?</h3>
                <div className="flex gap-4 mb-7 ">
                    <input className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base" 
                        type="text" 
                        placeholder='First Name' 
                        required
                        value={firstName}
                        onChange={(e)=>{
                            setFirstName(e.target.value);
                        }}
                    />
                    <input className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base" 
                        type="text" 
                        placeholder='Last Name' 
                        required
                        value={lastName}
                        onChange={(e)=>{
                            setLastName(e.target.value);
                        }}
                    />
                </div>
                <h3 className="text-xl font-medium mb-2">What's Your Email?</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                    type="email" 
                    placeholder='email@example.com' 
                    required 
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                />
                <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
                <input className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                    type="password" 
                    placeholder='password' 
                    required
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                />
                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Signup</button>
                <p className="text-center">Already have an Account? <Link to='/user-login' className="text-blue-600 ">Login Here<span>→</span></Link></p>
            </form>
        </div>
        <div>
            <Link 
                to='/captain-signup' 
                className="flex items-center justify-center bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">
                    Signup as a Captain
            </Link>
        </div>
    </div>
  )
}

export default UserSignup
