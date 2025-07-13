import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useContext} from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const URL = import.meta.env.VITE_BASE_URL;

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async(e) => {
    e.preventDefault();
    const data = {
      email : email,
      password : password
    };

    const response = await axios.post(`${URL}/captains/login`, data);

    if(response.status === 200){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="bg-[#eeeeee] p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-5"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-YLcX0i8q5ERgL_YRQ3PQsvtA_mJXgVhnw&s"
          alt="Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl font-medium mb-2">What's Your Email?</h3>
          <input
            className="bg-[#aeaeae] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
          <input
            className="bg-[#aeaeae] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"
          >
            Login
          </button>

          <p className="text-center">
            Join a Fleet?{' '}
            <Link to="/captain-signup" className="text-blue-600">
              Register as a Captain <span>→</span>
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/user-login"
          className="flex items-center justify-center bg-[#f3c164] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
