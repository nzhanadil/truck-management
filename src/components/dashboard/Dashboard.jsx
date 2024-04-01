import React from 'react'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import DriverDashboard from './DriverDashboard'

const Dashboard = () => {
  const { currentUser } = useSelector(store => store.users)

  return (
    <div className='w-full'>
      <header className='bg-teal-900 px-4 py-2 flex gap-5 h-[10vh] items-center w-full pl-16'>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

        <p className='text-white font-bold text-2xl'>Welcome back, {`${currentUser.firstname} ${currentUser.lastname}!`}</p>
      </header>

      { currentUser.role === 'driver' && <DriverDashboard />}
    </div>
  )
}

export default Dashboard
