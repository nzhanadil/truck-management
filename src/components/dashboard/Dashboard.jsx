import React from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import DriverDashboard from './DriverDashboard'
import Status from './Status'

const Dashboard = () => {
  const { currentUser } = useSelector(store => store.users)

  const users = useSelector(store => store.users)
  const trucks = useSelector(store => store.trucks)
  const trailers = useSelector(store => store.trailers)

  return (
    <div className='w-full'>
      <header className='bg-teal-900 px-4 py-2 flex gap-5 h-[10vh] items-center w-full pl-16'>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

        <p className='text-white font-bold text-2xl'>Welcome back, {`${currentUser.firstname} ${currentUser.lastname}!`}</p>
      </header>
      
      { currentUser.role !== 'driver' ? 
      <div className='flex'>
        <Status title='Trucks Status' data={trucks.data} options={['all', 'active', 'damaged', 'out of service', "assigned"]}/>
        <Status title='Trailers Status' data={trailers.data} options={['all', 'active', 'damaged', 'out of service', "assigned"]}/>
      </div>
      :
      <DriverDashboard />}


      <div>

      </div>
    </div>
  )
}

export default Dashboard
