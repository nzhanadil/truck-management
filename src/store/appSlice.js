import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    alert: null,

  },
  reducers: {
    setAlert: (state, action) => {
        state.alert = action.payload
    }
  },
})

export const { setAlert} = appSlice.actions
export default appSlice.reducer