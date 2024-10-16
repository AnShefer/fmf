import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  header: '',
};

const webDataSlice = createSlice({
  name: 'WebData',
  initialState,
  reducers: {
    setheader: (state, action) => {
      state.header = action.payload;
    },
  },
});

export const { setheader } = webDataSlice.actions;
export const selectWebData = (state) => state.WebData.value;
export default webDataSlice.reducer;
