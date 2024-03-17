import { configureStore } from '@reduxjs/toolkit'
import trucksReducer from './trucksSlice'
import usersReducer from './usersSlice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    trucks: trucksReducer,
    users: usersReducer,
    app: appReducer
  },
})