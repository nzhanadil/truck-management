import { CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-[100vh] absolute flex justify-center items-center z-10 bg-white'>
        <CircularProgress  />
    </div>
  )
}

export default Loading
