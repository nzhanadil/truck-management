import React from 'react'
import Header from '../layout/Header'
import { useSelector } from 'react-redux'
import TrailersList from './TrailersList'
import TrailerDialog from './TrailerDialog'
import { openNewTrailerDialog, setSearchText } from '../../store/trailersSlice'

const Trailers = () => {
  const { searchText } = useSelector((store) => store.trailers)

  return (
    <div className='w-full items-center'>
      <Header title="Trailers" setSearchText={setSearchText} searchText={searchText} openDialog={openNewTrailerDialog}/>
      <TrailersList />
      <TrailerDialog />
    </div>
  )
}

export default Trailers
