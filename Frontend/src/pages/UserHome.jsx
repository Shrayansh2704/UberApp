import React from 'react'

const UserHome = () => {
  return (
    <div className="h-screen w-screen relative">
      <img className="w-20 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
      <div className="h-screen w-screen">
        {/*This is just a temporary image*/}
        <img className="w-full h-full object-cover"src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>
      </div>
      <div className="bg-white absolute bottom-0 w-full p-5">
        <div>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form>
            <input 
              className="w-full bg-[#eee] px-12 py-2 rounded-lg text-base mb-4 mt-4" 
              type="text" 
              placeholder="Add a Pickup Location" />
            <input 
              className="w-full bg-[#eee] px-12 py-2 rounded-base text-lg" 
              type="text" 
              placeholder="Enter Your Location" />
          </form>
        </div>
        <div className="">

        </div>
      </div>
    </div>
  )
}

export default UserHome
