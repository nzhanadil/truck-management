import React, { useEffect } from 'react'
import Header from '../layout/Header'
import { useDispatch, useSelector } from 'react-redux'
import DriversList from './DriversList'
import DriverDialog from './DriverDialog'
import { getUsers, setSearchText } from '../../store/usersSlice'

const Drivers = () => {
  const { searchText, data } = useSelector((store) => store.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers()) 
  }, [])

  return (
    <div className='w-full'>
       <Header title="Drivers" setSearchText={setSearchText} searchText={searchText} />
       <DriversList />
       <DriverDialog />
    </div>
  )
}

export default Drivers
