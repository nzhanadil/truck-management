import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AssignDialog, StatusAlert, UnassignDialog } from './';
import { useDispatch } from 'react-redux';
import { getTrucks } from '../../store/trucksSlice';
import { getUsers } from '../../store/usersSlice';

const Layout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTrucks())
    dispatch(getUsers())
  }, [])

  return (
    <div className='flex w-full'>
      <AssignDialog />
      <UnassignDialog />
      <StatusAlert />
      <Outlet />
    </div>
  )
}

export default Layout
