import React from 'react'
import {IconButton, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import { useDispatch, useSelector } from 'react-redux';

const Header = ({title, searchText, setSearchText, openDialog}) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(store => store.users)

  return (
    <div className='p-6 bg-teal-900 flex pl-10 justify-between items-center h-[10vh] w-full'>
      <h1 className='font-bold text-2xl text-white mx-5'>{title}</h1>

      <div className='flex'>
        <div className='bg-white rounded-lg flex py-1 px-2'>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <Input
            placeholder="Search for anything"
            disableUnderline
            fullWidth
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))} 
          />
          {searchText && 
          <IconButton onClick={() => dispatch(setSearchText(''))}>
            <CloseIcon />
          </IconButton>}
        </div>

        <IconButton
          disabled={currentUser?.role === 'driver'} 
          onClick={() => dispatch(openDialog())}
        >
          <AddCircleIcon className='text-white text-2xl ml-3'/>
        </IconButton>

        <IconButton>
          <SortIcon className='text-white text-2xl'/>
        </IconButton>
      </div>
      
    </div>
  )
}

export default Header
