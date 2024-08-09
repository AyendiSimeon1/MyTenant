import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: any;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducer: {
        login: (state, action: PayloadAction<any>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        signup: (state, action: PayloadAction<any>) => {
            state.isAuthenticated = false;
            state.user = action.payload;
        }
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;