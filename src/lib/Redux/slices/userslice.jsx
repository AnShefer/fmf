import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  email: '',
  type: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setemail: (state, action) => {
      state.email = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser, setemail, setType } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
