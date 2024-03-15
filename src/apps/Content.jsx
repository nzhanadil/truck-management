import React, { useState } from 'react'
import Header from '../components/Header'

const Content = () => {
    const [searchText, setSearchText] = useState('')

  return (
    <div className='w-full'>
      <Header title="title" setSearchText={setSearchText} searchText={searchText}/>
    </div>
  )
}

export default Content
