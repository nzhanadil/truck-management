import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import db from '../services/firebase';
import { doc, updateDoc, setDoc, deleteDoc, collection, getDocs, getDoc} from 'firebase/firestore'

export const getUsers = createAsyncThunk(
  'users/getUsers', 
  async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const trucks = querySnapshot.docs.map(doc => doc.data())
    return trucks;
  }
)

export const addUser = createAsyncThunk(
  'users/addUser', 
  async (truck) => {
    const truckRef = doc(db, 'users', truck.id);
    const truckDoc = await getDoc(truckRef);
    if (truckDoc.exists()) return 'failed'
    await setDoc(truckRef, truck);
    return truck;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser', 
  async ( id ) => {
    await deleteDoc(doc(db, 'users', id))
    return id
  }
)

export const deleteAllUsers = createAsyncThunk(
  'users/deleteAllUsers', 
  async ( id ) => {
    const trucks = await  getDocs(collection(db, 'users'));
    for(let truck of trucks ){
      await deleteDoc(doc(db, 'users', truck.id))
    }
    return []
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser', 
  async ( updatedTruck ) => {
    await updateDoc(doc(db, 'users', updatedTruck.id), updatedTruck)
    return updatedTruck
  }
)

const initialState = {
  searchText: '',
  userDialog: {
    type: '',
    isOpen: false,
    data: null
  },
  currentUser: null,
  data: [],
  userModal: true,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.currentUser = action.payload
    },
    openUserModal: (state) => {
      state.userModal = true
    },
    closeUserModal: (state) => {
      state.userModal = false
    },
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
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(addUser.fulfilled, (state, action) => {
        if(action.payload !== 'failed') state.data.push(action.payload)
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter(truck => truck.id !== action.payload)
      })
      .addCase(deleteAllUsers.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        let index = state.data.findIndex(truck => truck.id === action.payload.id)
        state.data[index] = action.payload
      })
  }
})

export const { setUser, openUserModal, closeUserModal } = usersSlice.actions
export default usersSlice.reducer
