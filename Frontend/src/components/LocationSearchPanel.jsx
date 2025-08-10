import React from 'react'

const LocationSearchPanel = (props) => {



  // sample array for location
  const locations = [
    "24B Near Kapoor's Cafe, Shreyians Coding School, Bhopal",
    "22A Near Malholtra's Cafe, Shreyians Coding School, Bhopal", 
    "23C Near Singhania's Cafe, Shreyians Coding School, Bhopal",
    "25D Near Sharma's Cafe, Shreyians Coding School, Bhopal",
  ]
  return (
    <div className="">
      {/* This is just a sample data*/}
      {
        locations.map(function(location){
          return <div onClick={()=>{
            props.setVehiclePanel(true);
          }} className="flex items-center justify-start gap-4 border-2 p-3 my-4 border-gray-50 rounded-xl active:border-black">
                    <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full"><i className="ri-map-pin-fill"></i></h2>
                    <h4 className="font-medium">{location}</h4>
                  </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel
