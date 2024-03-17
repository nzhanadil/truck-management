import { configureStore } from '@reduxjs/toolkit'
import trucksReducer from './trucksSlice'
import usersReducer from './usersSlice'

export const store = configureStore({
  reducer: {
    trucks: trucksReducer,
    users: usersReducer,
  },
})