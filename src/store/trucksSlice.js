import { createSlice } from '@reduxjs/toolkit'
import db from '../services/firebase';

const initialState = {
  searchText: '',
  truckDialog: false,
  data: [],
  value: 0
}

export const trucksSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload.message;
    },
    getTrucks: (state) => {
      const dataFromFirebase = []
      db.collection('trucks').onSnapshot((snapshot) => {
          state.data = snapshot.docs.map(doc => ({
            ...doc.data()
          }))
        })        
    
    },
    addNewTruck: (state, action) => {
      db.collection('trucks').add(action.payload)
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearchText, getTrucks, addNewTruck, incrementByAmount } = trucksSlice.actions

export default trucksSlice.reducer