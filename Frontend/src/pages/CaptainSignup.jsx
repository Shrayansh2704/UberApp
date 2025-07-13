import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';  

const URL = import.meta.env.VITE_BASE_URL;


const CaptainSignup = () => {

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async(e) => {
    e.preventDefault();
    const data = {
      fullName: {
        firstName : firstName,
        lastName : lastName
      },
      email : email,
      password : password,
      vehicle: {
        color : vehicleColor,
        plate : vehiclePlate,
        capacity : Number(vehicleCapacity),
        vehicleType : vehicleType.toLowerCase(),
      },
    }; 

    const response = await axios.post(`${URL}/captains/register`, data);

    if(response.status === 201){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className="p-7 bg-[#eeeeee] h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-5"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-YLcX0i8q5ERgL_YRQ3PQsvtA_mJXgVhnw&s"
          alt="Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl font-medium mb-2">What's Your Name?</h3>
          <div className="flex gap-4 mb-7">
            <input
              className="bg-[#aeaeae] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#aeaeae] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-xl font-medium mb-2">What's Your Email?</h3>
          <input
            className="bg-[#aeaeae] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-xl font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#aeaeae] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className="text-xl font-medium mb-2">Vehicle Details</h3>
          <div className="flex gap-4 mb-4">
            <input
              className="bg-[#aeaeae] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              required
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              className="bg-[#aeaeae] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              required
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
          </div>

          <input
            className="bg-[#aeaeae] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="text"
            placeholder="Vehicle Plate Number"
            required
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />

          <select
            className="bg-[#aeaeae] mb-7 rounded px-4 py-2 border w-full text-lg"
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            <option value="Auto">Auto</option>
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
          </select>

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Signup
          </button>
          <p className="text-center">
            Already have an Account?{' '}
            <Link to="/captain-login" className="text-blue-600">
              Login Here<span>→</span>
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/user-signup"
          className="flex items-center justify-center bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
        >
          Signup as a User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
