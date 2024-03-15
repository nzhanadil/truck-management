import { configureStore } from '@reduxjs/toolkit'
import trucks from './trucksSlice'

export const store = configureStore({
  reducer: {
    trucks
  },
})