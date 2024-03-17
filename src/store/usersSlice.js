import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null
  },
  reducers: {
    setUser: (state, action) => {
        state.currentUser = action.payload
    }
  },
})

export const { setUser } = usersSlice.actions
export default usersSlice.reducer