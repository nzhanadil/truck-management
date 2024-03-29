import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    alert: null,
    unassignDialog: { type: '', isOpen: false, id: '' },
    assignDialog: { type: '', isOpen: false, id: '' },
  },
  reducers: {
    setAlert: (state, action) => {
        state.alert = action.payload
    },
    openTruckUnassignDialog: (state, action) => {
      state.unassignDialog = {type: 'truck', isOpen: true, id: action.payload}
    },
    openTrailerUnassignDialog: (state, action) => {
      state.unassignDialog = {type: 'trailer', isOpen: true, id: action.payload}
    },
    closeUnassignDialog: (state) => {
      state.unassignDialog = {type: '', isOpen: false, id: ''}
    },
    openTruckAssignDialog: (state, action) => {
      state.assignDialog = {type: 'truck', isOpen: true, id: action.payload}
    },
    openTrailerAssignDialog: (state, action) => {
      state.assignDialog = {type: 'trailer', isOpen: true, id: action.payload}
    },
    closeAssignDialog: (state) => {
      state.assignDialog = {type: '', isOpen: false, id: ''}
    }
  },
})

export const { 
  setAlert, 
  openTruckUnassignDialog, 
  openTrailerUnassignDialog, 
  closeUnassignDialog,
  openTrailerAssignDialog,
  openTruckAssignDialog,
  closeAssignDialog 
} = appSlice.actions

export default appSlice.reducer