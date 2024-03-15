import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getVehicleDetails = createAsyncThunk('detail/getVehicleDetails', async vehicleId => {
  let response = await axios.get(`${BASE_URL}/vehicles/${vehicleId}`, {
    headers: {
      Authorization: process.env.REACT_APP_API_TOKEN
    }
  });
  return response.data;
});

export const postIssue = createAsyncThunk('detail/postIssue', async (issue, { dispatch }) => {
  await axios.post(
    `${BASE_URL}/vehicles/${issue.vehicleId}/issues`,
    {
      vehicle_id: issue.vehicleId,
      description: issue.description,
      priority: issue.priority,
      due_date: issue.dueDate
    },
    {
      headers: {
        Authorization: process.env.REACT_APP_API_TOKEN
      }
    }
  );
  dispatch(getVehicleDetails(issue.vehicleId));
});

const initialState = { data: {}, isFetching: false, error: null };

export const trucksDetailsSlice = createSlice({
  name: 'trucksDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getVehicleDetails.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isFetching = false;
      state.error = null;
    },
    [getVehicleDetails.pending]: (state, action) => {
      state.data = null;
      state.isFetching = true;
      state.error = null;
    },
    [getVehicleDetails.rejected]: (state, action) => {
      state.data = null;
      state.isFetching = false;
      state.error = 'Failed to load details of vehicle';
    }
  }
});

export default vDetailsSlice.reducer;
