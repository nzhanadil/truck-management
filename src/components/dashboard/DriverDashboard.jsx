import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openTrailerUnassignDialog, openTruckUnassignDialog } from '../../store/appSlice'

const DriverDashboard = () => {
    const { currentUser } = useSelector(store => store.users)
    const dispatch = useDispatch()
    const { truck, trailer, trucksHistory, trailersHistory } = currentUser

    const handleTruck = () => {
        if(truck) dispatch(openTruckUnassignDialog(truck))
    }

    const handleTrailer = () => {
        if(trailer) dispatch(openTrailerUnassignDialog(trailer))
    }
  return (
    <div className='xs:flex-col xs:items-center flex md:flex-row'>
        <div className='w-56 h-60 rounded-lg border-2 shadow-lg m-5 p-5 items-center flex flex-col justify-center gap-5'>
            <p className='text-lg font-bold text-teal-900'>Truck status</p>

            <p className='font-bold text-4xl text-teal-900'>{truck || "No Truck"}</p>
            {truck && <p>Since: {trucksHistory[trucksHistory.length -1].startDate.replaceAll('-', '/')}</p>}
            
            {truck &&
            <button
                onClick={handleTruck}
                className='bg-teal-900 w-[80%] text-white py-2 rounded-lg hover:bg-teal-700 font-bold'
            >
                Assign Truck
            </button>}
        </div>

        <div className='w-56 h-60 rounded-lg border-2 shadow-lg m-5 p-5 items-center flex flex-col justify-center gap-5'>
            <p className='text-lg font-bold text-teal-900'>Trailer status</p>

            <p className='font-bold text-4xl text-teal-900'>{trailer || "No Trailer"}</p>
            {trailer && <p>Since: {trailersHistory[trailersHistory.length -1].startDate.replaceAll('-', '/')}</p>}
            
            {trailer &&
            <button
            onClick={handleTrailer}
            className='bg-teal-900 w-[80%] text-white py-2 rounded-lg hover:bg-teal-700 font-bold'
            >
                Unassign Trailer
            </button>}
        </div>
      
    </div>
  )
}

export default DriverDashboard
