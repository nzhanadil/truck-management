import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openTruckUnassignDialog } from '../../store/appSlice'

const DriverDashboard = () => {
    const { currentUser } = useSelector(store => store.users)
    const dispatch = useDispatch()
    const { truck, trailer, trucksHistory, trailersHistory } = currentUser

    const handleTruck = () => {
        if(truck) dispatch(openTruckUnassignDialog(truck))
    }

    const handleTrailer = () => {
        // TODO
    }
  return (
    <div className='flex'>
        <div className='w-56 h-60 rounded-lg border-2 shadow-lg m-5 p-5 items-center flex flex-col justify-center gap-5'>
            <p className='text-lg font-bold'>Truck status</p>

            <p className='font-bold text-4xl'>{truck || "No Truck"}</p>
            {truck && <p>Since: {trucksHistory[trucksHistory.length -1].startDate.replaceAll('-', '/')}</p>}
            
            <button
                onClick={handleTruck}
                className='bg-teal-900 w-[80%] text-white py-2 rounded-lg hover:bg-teal-700 font-bold'
            >
                {truck ? 'Unassign Truck' : 'Assign Truck'}
            </button>
        </div>

        <div className='w-56 h-60 rounded-lg border-2 shadow-lg m-5 p-5 items-center flex flex-col justify-center gap-5'>
            <p className='text-lg font-bold'>Trailer status</p>

            <p className='font-bold text-4xl'>{trailer || "No Trailer"}</p>
            {trailer && <p>Since: {trailersHistory[trailersHistory.length -1].startDate.replaceAll('-', '/')}</p>}
            
            <button
                onClick={handleTrailer}
                className='bg-teal-900 w-[80%] text-white py-2 rounded-lg hover:bg-teal-700 font-bold'
            >
                {trailer ? 'Unassign Trailer' : 'Assign Trailer'}
            </button>
        </div>
      
    </div>
  )
}

export default DriverDashboard
