import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AppStateType = {
    authIsLoading: boolean;
};

const initialState: AppStateType = {
    authIsLoading: true,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAuthIsLoading: (state, action: PayloadAction<boolean>) => {
            state.authIsLoading = action.payload;
        },
    },
});

export const { setAuthIsLoading } = appSlice.actions;

export default appSlice.reducer;
