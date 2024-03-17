import React, { useEffect, useState } from 'react'
import TrucksList from './TrucksList'
import Header from '../layout/Header'
import { useDispatch, useSelector } from 'react-redux'
import { addNewTruck, getTrucks, incrementByAmount, setSearchText } from '../../store/trucksSlice'
import { Button } from '@mui/material'

const Trucks = () => {
  const [searchText, setSearchText] = useState('')
  const {data, value} = useSelector((state) => state.trucks)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getTrucks())
  // }, [])


  return (
    <div className='w-full'>
       <Header title="Trucks" setSearchText={setSearchText} searchText={searchText}/>
       <TrucksList />
       {/* <Button onClick={() => dispatch(addNewTruck({color:'blue', vin:'bfbgbg', year:'2009'}))}>
          Add
        </Button> */}
        {/* {console.log(data)} */}
    </div>
  )
}

export default Trucks
