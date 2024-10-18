import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedInUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload; // Update the state with the user object
    },
    clearUser: (state) => {
      state.loggedInUser = null; // Clear the state when logging out
    },
  },
});

export const { setLoggedInUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
