import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import db from '../services/firebase';
import { doc, updateDoc, setDoc, deleteDoc, collection, getDocs, getDoc} from 'firebase/firestore'

export const getTrailers = createAsyncThunk(
  'trailers/getTrailers', 
  async () => {
    const querySnapshot = await getDocs(collection(db, 'trailers'));
    const trailers = querySnapshot.docs.map(doc => doc.data())
    return trailers;
  }
)

export const addTrailer = createAsyncThunk(
  'trailers/addTrailer', 
  async (trailer) => {
    const trailerRef = doc(db, 'trailers', trailer.id);
    const trailerDoc = await getDoc(trailerRef);
    if (trailerDoc.exists()) return 'failed'
    await setDoc(trailerRef, {...trailer, history: []});
    return {...trailer, history: []};
  }
);

export const deleteTrailer = createAsyncThunk(
  'trailers/deleteTrailer', 
  async ( id ) => {
    await deleteDoc(doc(db, 'trailers', id))
    return id
  }
)

export const deleteAllTrailers = createAsyncThunk(
  'trailers/deleteAllTrailers', 
  async () => {
    const trailers = await  getDocs(collection(db, 'trailers'));
    for(let trailer of trailers ){
      await deleteDoc(doc(db, 'trailers', trailer.id))
    }
    return []
  }
)

export const updateTrailer = createAsyncThunk(
  'trailers/updateTrailer', 
  async ( updatedTrailer ) => {
    await updateDoc(doc(db, 'trailers', updatedTrailer.id), updatedTrailer)

    const updatedDocSnapshot = await getDoc(doc(db, 'trailers', updatedTrailer.id));
    const updatedData = updatedDocSnapshot.data();
    
    return updatedData;
  }
)

const initialState = {
  searchText: '',
  trailerDialog: {
    type: '',
    isOpen: false,
    data: null
  },
  data: [],
}

export const trailersSlice = createSlice({
  name: 'trailers',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    openNewTrailerDialog: (state, action) => {
      state.trailerDialog = {
        type: 'new',
        isOpen: true,
        data: null
      }
    },
    closeTrailerDialog: (state, action) => {
      state.trailerDialog = {
        type: '',
        isOpen: false,
        data: null
      }
    },
    openEditTrailerDialog: (state, action) => {
      state.trailerDialog = {
        type: 'edit',
        isOpen: true,
        data: action.payload
      }
    }
  }, extraReducers: builder => {
    builder
      .addCase(getTrailers.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(addTrailer.fulfilled, (state, action) => {
        if(action.payload !== 'failed') state.data.push(action.payload)
      })
      .addCase(deleteTrailer.fulfilled, (state, action) => {
        state.data = state.data.filter(trailer => trailer.id !== action.payload)
      })
      .addCase(deleteAllTrailers.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(updateTrailer.fulfilled, (state, action) => {
        let index = state.data.findIndex(trailer => trailer.id === action.payload.id)
        state.data[index] = action.payload
      })
  }
})

export const { 
  setSearchText, 
  openNewTrailerDialog, 
  closeTrailerDialog, 
  openEditTrailerDialog, 
} = trailersSlice.actions

export default trailersSlice.reducer