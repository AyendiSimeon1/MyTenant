import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.userData = {};
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
  userData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.userData = {};
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;