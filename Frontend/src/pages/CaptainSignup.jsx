import React, {useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
   const [firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    const submitHandler = (e)=>{
        e.preventDefault();
        setCaptainData({
            fullName :{
                firstName : firstName,
                lastName : lastName
            },
            email : email,
            password : password
        });
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }
  
  return (
    <div className="p-7 bg-[#eeeeee] h-screen flex flex-col justify-between">
        <div>
            <img className="w-20  mb-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-YLcX0i8q5ERgL_YRQ3PQsvtA_mJXgVhnw&s" />
            <form onSubmit={(e)=>{
                submitHandler(e);
            }}>
                <h3 className="text-xl font-medium mb-2">What's Your Name?</h3>
                <div className="flex gap-4 mb-7 ">
                    <input className="bg-[#aeaeae] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base" 
                        type="text" 
                        placeholder='First Name' 
                        required
                        value={firstName}
                        onChange={(e)=>{
                            setFirstName(e.target.value);
                        }}
                    />
                    <input className="bg-[#aeaeae] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base" 
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
                <input className="bg-[#aeaeae] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                    type="email" 
                    placeholder='email@example.com' 
                    required 
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                />
                <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
                <input className="bg-[#aeaeae] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base" 
                    type="password" 
                    placeholder='password' 
                    required
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                />
                <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Signup</button>
                <p className="text-center">Already have an Account? <Link to='/captain-login' className="text-blue-600 ">Login Here<span>→</span></Link></p>
            </form>
        </div>
        <div>
            <Link 
                to='/user-signup' 
                className="flex items-center justify-center bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">
                    Signup as a User
            </Link>
        </div>
    </div>
  )
}

export default CaptainSignup
