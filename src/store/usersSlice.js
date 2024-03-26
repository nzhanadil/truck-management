import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import db, { auth } from '../services/firebase';
import { doc, updateDoc, setDoc, deleteDoc, collection, getDocs, getDoc} from 'firebase/firestore'
import { getCurrentDate } from '../utils/HelperFunctions';

export const getUsers = createAsyncThunk(
  'users/getUsers', 
  async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    return users;
  }
)

export const addUser = createAsyncThunk(
  'users/addUser', 
  async (user) => {
    const userRef = doc(db, 'users', user.id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) return 'failed'
    await setDoc(userRef, user);
    return user;
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
  async ( updatedUser ) => {
    await updateDoc(doc(db, 'users', updatedUser.email), updatedUser)

    const updatedDocSnapshot = await getDoc(doc(db, 'users', updateUser.email));
    const updatedData = updatedDocSnapshot.data();
    
    return updatedData;
  }
)

export const getTrucksHistory = createAsyncThunk(
  'users/getTrucksHistory', 
  async (email) => {
    const querySnapshot = await getDocs(collection(db, `users/${email}/trucksHistory`));
    const trucksHistory = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    return trucksHistory;
  }
)

export const assignTruckToUser = createAsyncThunk(
  'users/assignTruckToUser', 
  async ({truck, email}) => {
    const truckHistory = {startDate: getCurrentDate(), endDate: '', truck: truck}
    const historyRef = doc(db, `users/${email}/trucksHistory`, getCurrentDate());
    await setDoc(historyRef, truckHistory);
    return truckHistory;
  }
);

export const unassignTruckFromUser = createAsyncThunk(
  'users/unassignTruckFromUser', 
  async ( updatedHistory, email ) => {
    updateUser({email, truck: ''})
    await updateDoc(doc(db, `users/${email}/trucksHistory`, updatedHistory.startDate), {updatedHistory, endDate: getCurrentDate()})
    return updatedHistory
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
        let index = state.data.findIndex(user => user.email === action.payload.email)
        state.data[index] = action.payload
      })
      .addCase(getTrucksHistory.fulfilled, (state, action) => {
        console.log(action.payload)
      })
      .addCase(assignTruckToUser.fulfilled, (state, action) => {
        console.log(action.payload)
      })
      .addCase(unassignTruckFromUser.fulfilled, (state, action) => {
        console.log(action.payload)
      })
  }
})

export const { 
  setUser, 
  openUserModal, 
  closeUserModal, 
  setSearchText
} = usersSlice.actions
export default usersSlice.reducer
