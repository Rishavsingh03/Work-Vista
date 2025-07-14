import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      return initialState; // Reset to initial state
    }
  }
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;