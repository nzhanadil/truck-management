import React from 'react'
import TrucksList from './TrucksList'
import Header from '../layout/Header'
import { useSelector } from 'react-redux'
import { openNewTruckDialog, setSearchText } from '../../store/trucksSlice'
import TruckDialog from './TruckDialog'

const Trucks = () => {
  const { searchText } = useSelector((store) => store.trucks)

  return (
    <div className='w-full items-center'>
      <Header title="Trucks" setSearchText={setSearchText} searchText={searchText} openDialog={openNewTruckDialog}/>
      <TrucksList />
      <TruckDialog />
    </div>
  )
}

export default Trucks
