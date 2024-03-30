import React from 'react'
import Header from '../layout/Header'
import { useSelector } from 'react-redux'
import DriversList from './DriversList'
import DriverDialog from './DriverDialog'
import { setSearchText } from '../../store/usersSlice'

const Drivers = () => {
  const { searchText } = useSelector((store) => store.users)

  return (
    <div className='w-full'>
       <Header title="Drivers" setSearchText={setSearchText} searchText={searchText} />
       <DriversList />
       <DriverDialog />
    </div>
  )
}

export default Drivers
