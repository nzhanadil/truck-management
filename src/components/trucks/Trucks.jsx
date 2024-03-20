import React, { useEffect, useState } from 'react'
import TrucksList from './TrucksList'
import Header from '../layout/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getTrucks, openNewTruckDialog, setSearchText, updateTruck } from '../../store/trucksSlice'
import TruckDialog from './TruckDialog'

const Trucks = () => {
  const [searchText, setSearchText] = useState('')
  const trucks = useSelector((state) => state.trucks)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getTrucks())
  }, [])

  return (
    <div className='w-full'>
       <Header title="Trucks" setSearchText={setSearchText} searchText={searchText} openDialog={openNewTruckDialog}/>
       <TrucksList />
       <TruckDialog />
    </div>
  )
}

export default Trucks
