import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserStateType = {
    isAuth: boolean;
    isVerified: boolean;
};

const initialState: UserStateType = {
    isAuth: false,
    isVerified: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setIsVerified: (state, action: PayloadAction<boolean>) => {
            state.isVerified = action.payload;
        },
        setUserData: (state) => {
            state.isAuth = false;
            state.isVerified = false;
        },
    },
});

export const { setIsAuth, setIsVerified, setUserData } = userSlice.actions;

export default userSlice.reducer;
