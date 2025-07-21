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

  return (
    <div className="h-screen w-screen relative">
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
              <LocationSearchPanel />
        </div>
      </div>
    </div>
  )
}

export default UserHome
