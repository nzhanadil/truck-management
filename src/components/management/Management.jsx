import React from 'react'
import UserModal from './UserModal'
import { Button } from '@mui/material'
import { openUserModal } from '../../store/usersSlice'
import { useDispatch } from 'react-redux'

const Management = () => {
    const dispatch = useDispatch()

  return (
    <div>
        <Button onClick={() => dispatch(openUserModal())}>Add new</Button>
        <UserModal />
    </div>
  )
}

export default Management
