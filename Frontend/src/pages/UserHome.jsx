import React, { useState, useRef } from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

const UserHome = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef= useRef(null);
  const[vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null); 

  const submitHandler = (e)=>{  
    e.preventDefault();

  }

  useGSAP(function(){
    if(panelOpen){
        gsap.to(panelRef.current,{
          height :'75%',
          padding : 25,
          opacity : 1,
      })
        gsap.to(panelCloseRef.current,{
          opacity : 1,
      })
    }else{
        gsap.to(panelRef.current,{
          height :'0%',
          padding : 0,
          opacity : 0.5,
      })
        gsap.to(panelCloseRef.current,{
          opacity : 0
      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel){
        gsap.to(vehiclePanelRef.current,{
          transform:'translateY(0%)',
      })
    }else{
        gsap.to(vehiclePanelRef.current,{
          transform:'translateY(100%)',
      })
    }
  },[vehiclePanel])

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <img className="w-20 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
      <div className="h-screen w-screen">
        {/*This is just a temporary image*/}
        <img className="w-full h-full object-cover"src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[26%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef} 
            onClick={()=>{
              setPanelOpen(false);
            }}
            className='absolute opacity-0 right-6 top-6 font-bold text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a Trip</h4>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <div className="line absolute h-16.5 w-1 top-[42%] left-10 bg-gray-900 rounded-lg"></div>
            <input 
              onClick={()=>{
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e)=>{
                setPickup(e.target.value);
              }}
              className="w-full bg-[#eee] px-12 py-2 rounded-lg text-lg mb-5 mt-5" 
              type="text" 
              placeholder="Add a Pickup Location" />
            <input
              onClick={()=>{
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e)=>{
                setDestination(e.target.value);
              }}
              className="w-full bg-[#eee] px-12 py-2 rounded-lg text-lg" 
              type="text" 
              placeholder="Enter Your Location" />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 opacity-1 overflow-hidden">
              <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white py-8 px-3">
        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      
      {/*  <div className="flex border-2 border-gray-200 active:border-black cursor-pointer mb-2 rounded-xl w-full p-4 items-center justify-between">
          <img 
            className="h-15"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1743773253/assets/5e/8ce23d-35fa-425d-a7d2-08a2826d04bc/original/UberBlackXL.png" />
          <div className="w-1/2">
            <h4 className="font-medium text-base">UberPremium <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className="font-medium text-s">10 min away</h5>
            <p className="font-medium text-sm text-gray-600">Premium, comfordable rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹300.20</h2>
        </div> */}
        
        <div className="flex border-2 border-gray-200 active:border-black cursor-pointer mb-2 rounded-xl w-full p-4 items-center justify-between">
          <img 
            className="h-18 ml-2"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" />
          <div className=" ml-2.5 w-1/2">
            <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className="font-medium text-s">5 min away</h5>
            <p className="font-medium text-sm text-gray-600">Affordable, compact rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹190.20</h2>
        </div>

        <div className="flex border-2 border-gray-200 active:border-black cursor-pointer mb-2 rounded-xl w-full p-4 items-center justify-between">
          <img 
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" />
          <div className=" ml-2.5 w-1/2">
            <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className="font-medium text-s">4 min away</h5>
            <p className="font-medium text-sm text-gray-600">Affordable, auto rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹120.20</h2>
        </div>

        <div className="flex border-2 border-gray-200 active:border-black cursor-pointer mb-2 rounded-xl w-full p-4 items-center justify-between">
          <img 
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" />
          <div className=" ml-2.5 w-1/2">
            <h4 className="font-medium text-base">UberMoto <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className="font-medium text-s">2 min away</h5>
            <p className="font-medium text-sm text-gray-600">Affordable, bike rides</p>
          </div>
          <h2 className="text-lg font-semibold">₹50.20</h2>
        </div>

        

      </div>

      
    </div>
  )
}

export default UserHome
