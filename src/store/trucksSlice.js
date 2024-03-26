import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import db from '../services/firebase';
import { doc, updateDoc, setDoc, deleteDoc, collection, getDocs, getDoc} from 'firebase/firestore'

export const getTrucks = createAsyncThunk(
  'trucks/getTruck', 
  async () => {
    const querySnapshot = await getDocs(collection(db, 'trucks'));
    const trucks = querySnapshot.docs.map(doc => doc.data())
    return trucks;
  }
)

export const addTruck = createAsyncThunk(
  'trucks/addTruck', 
  async (truck) => {
    const truckRef = doc(db, 'trucks', truck.id);
    const truckDoc = await getDoc(truckRef);
    if (truckDoc.exists()) return 'failed'
    await setDoc(truckRef, truck);
    return truck;
  }
);

export const deleteTruck = createAsyncThunk(
  'trucks/deleteTruck', 
  async ( id ) => {
    await deleteDoc(doc(db, 'trucks', id))
    return id
  }
)

export const deleteAllTrucks = createAsyncThunk(
  'trucks/deleteAllTrucks', 
  async ( id ) => {
    const trucks = await  getDocs(collection(db, 'trucks'));
    for(let truck of trucks ){
      await deleteDoc(doc(db, 'trucks', truck.id))
    }
    return []
  }
)

export const updateTruck = createAsyncThunk(
  'trucks/updateTruck', 
  async ( updatedTruck ) => {
    await updateDoc(doc(db, 'trucks', updatedTruck.id), updatedTruck)

    const updatedDocSnapshot = await getDoc(doc(db, 'trucks', updatedTruck.id));
    const updatedData = updatedDocSnapshot.data();
    
    return updatedData;
  }
)

const initialState = {
  searchText: '',
  truckDialog: {
    type: '',
    isOpen: false,
    data: null
  },
  data: [],
}

export const trucksSlice = createSlice({
  name: 'trucks',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    openNewTruckDialog: (state, action) => {
      state.truckDialog = {
        type: 'new',
        isOpen: true,
        data: null
      }
    },
    closeTruckDialog: (state, action) => {
      state.truckDialog = {
        type: '',
        isOpen: false,
        data: null
      }
    },
    openEditTruckDialog: (state, action) => {
      state.truckDialog = {
        type: 'edit',
        isOpen: true,
        data: action.payload
      }
    }
  }, extraReducers: builder => {
    builder
      .addCase(getTrucks.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(addTruck.fulfilled, (state, action) => {
        if(action.payload !== 'failed') state.data.push(action.payload)
      })
      .addCase(deleteTruck.fulfilled, (state, action) => {
        state.data = state.data.filter(truck => truck.id !== action.payload)
      })
      .addCase(deleteAllTrucks.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(updateTruck.fulfilled, (state, action) => {
        let index = state.data.findIndex(truck => truck.id === action.payload.id)
        state.data[index] = action.payload
      })
  }
})

export const { 
  setSearchText, 
  openNewTruckDialog, 
  closeTruckDialog, 
  openEditTruckDialog, 
} = trucksSlice.actions

export default trucksSlice.reducer