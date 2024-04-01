import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const RequireAuth = ({ allowedRoles }) => {
    const { currentUser } = useSelector(store => store.users)
    const location = useLocation()

    return (
        (currentUser && allowedRoles?.includes(currentUser.role))
            ? 
            <div className='w-[100vw] flex h-[100vh]'>
                <Navbar />
                <Outlet />
            </div>
            : currentUser 
                ? <Navigate to='/' state={{from: location}} replace />  
                : <Navigate to='signin' state={{from: location}} replace />       
    )
}

export default RequireAuth