import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for the user state
export interface User {
    id: string;
   name: string;
    email: string;
    createdAt: Date;
    profiles: string[]; // Assuming profiles is an array of strings

}

export interface UserState {
    user: User | null;
    isLoggedIn: boolean;
}

// Initial state
const initialState: UserState = {
    user: null,
    isLoggedIn: false,
};

// Create the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoggedIn = true; // Set isLoggedIn to true when a user is set   
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoggedIn = false; // Reset isLoggedIn when user is cleared
        },
    },
});

export const { setActiveUser,clearUser } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsLoggedIn = (state: { user: UserState }) => state.user.isLoggedIn;
export default userSlice.reducer;