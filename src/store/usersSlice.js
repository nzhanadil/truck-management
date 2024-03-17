import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
    userModal: true
  },
  reducers: {
    setUser: (state, action) => {
        state.currentUser = action.payload
    },
    openUserModal: (state) => {
      state.userModal = true
    },
    closeUserModal: (state) => {
      state.userModal = false
    } 
  },
})

export const { setUser, openUserModal, closeUserModal } = usersSlice.actions
export default usersSlice.reducer