import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import db from '../services/firebase';

// export const getTrucks = createAsyncThunk(
//   'trucks/getTrucks',
//   let trucks
//   db.collection('trucks')
//     .onSnapshot(snapshot => trucks = snapshot.docs.map(doc => doc.data())


// );

export const getTrucks = () => {
  let data;

  db.collection('trucks')
    .onSnapshot(snapshot => {
      data = snapshot.docs.map(doc => doc.data());
    })

  return data;
}

export const addTruck = createAsyncThunk(
  'vehiclesApp/vehicles/addVehicle',
  // async (vehicle, { dispatch, getState }) => {
  //   const response = await axios.post(VEHICLES_BASE_URL, vehicle, { 
  //     headers: {
  //       Authorization: process.env.REACT_APP_API_TOKEN,
  //       'Content-Type': 'application/json'
  //     }
  //   });

  //   const data = await response.data;

  //   return data;
  // }
);

export const updateTruck = createAsyncThunk(
  'vehiclesApp/vehicles/updateVehicle',
  // async (vehicle, { dispatch, getState }) => {
  //   const response = await axios.post('/api/vehicles-app/update-vehicle', { vehicle });
  //   const data = await response.data;

  //   dispatch(getVehicles());

  //   return data;
  // }
);

export const removeTruck = createAsyncThunk(
  'vehiclesApp/vehicles/removeVehicle',
  // async (vehicleId, { dispatch, getState }) => {
  //   const response = await axios.delete(`${VEHICLES_BASE_URL}/${vehicleId}`, {
  //     headers: {
  //       Authorization: process.env.REACT_APP_API_TOKEN,
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   return vehicleId;
  // }
);

const trucksAdapter = createEntityAdapter({
  selectId: entity => entity.id, 
  sortComparer: (a, b) => b.id - a.id
})

const trucksSlice = createSlice({
  name: 'trucks',
  initialState: trucksAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    truckDialog: {
      type: 'new',
      props: {
        open: false
      },
      data: null
    }
  }),
  reducers: {
    setTrucksSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      }
      // prepare: event => ({ payload: event.target.value || '' })
    },
    openNewTruckDialog: (state, action) => {
      state.truckDialog = {
        type: 'new',
        props: {
          open: true
        },
        data: null
      };
    },
    closeNewTruckDialog: (state, action) => {
      state.truckDialog = {
        type: 'new',
        props: {
          open: false
        },
        data: null
      };
    },
    openEditTruckDialog: (state, action) => {
      state.vehicleDialog = {
        type: 'edit',
        props: {
          open: true
        },
        data: action.payload
      };
    },
    closeEditTruckDialog: (state, action) => {
      state.vehicleDialog = {
        type: 'edit',
        props: {
          open: false
        },
        data: null
      };
    }
  },
  // extraReducers: {
  //   [updateTruck.fulfilled]: trucksAdapter.upsertOne,
  //   [addTruck.fulfilled]: (state, action) => trucksAdapter.addOne(state, action.payload),
  //   [removeTruck.fulfilled]: (state, action) => trucksAdapter.removeOne(state, action.payload),
  //   [getTrucks.fulfilled]: (state, action) => {
  //     const {data} = action.payload;
  //     trucksAdapter.setAll(state, data);
  //     // state.routeParams = routeParams;
  //     // state.searchText = '';
  //   }
  // }
});

// export const {
//   setTrucksSearchText,
//   openNewTruckDialog,
//   closeNewTruckDialog,
//   openEditTruckDialog,
//   closeEditTruckDialog
// } = trucksSlice.actions;

export default trucksSlice.reducer;
