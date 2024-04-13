import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col h-[100vh] w-[100vw] justify-center text-center'>
      <p className='text-5xl font-bold text-teal-950'>404</p>
      <p className='text-3xl font-bold text-teal-950 m-4'>Page not found</p>

      <button
        className='px-4 py-2 bg-teal-900 text-white text-2xl rounded-lg hover:bg-teal-700 w-60 mx-auto'
        onClick={() =>navigate('/')}
      >
        Back to Homepage
      </button>
    </div>
  )
}

export default PageNotFound
