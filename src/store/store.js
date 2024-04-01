import { configureStore } from '@reduxjs/toolkit'
import trucksReducer from './trucksSlice'
import trailersReducer from './trailersSlice'
import usersReducer from './usersSlice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    trucks: trucksReducer,
    trailers: trailersReducer,
    users: usersReducer,
    app: appReducer
  },
})