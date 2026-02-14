import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AppStateType = {
    serverIsAvailable: boolean;
    appIsLoading: boolean;
    authIsLoading: boolean;
};

const initialState: AppStateType = {
    serverIsAvailable: true,
    appIsLoading: true,
    authIsLoading: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setServerIsAvailable: (state, action: PayloadAction<boolean>) => {
            state.serverIsAvailable = action.payload;
        },
        setAppIsLoading: (state, action: PayloadAction<boolean>) => {
            state.appIsLoading = action.payload;
        },
        setAuthIsLoading: (state, action: PayloadAction<boolean>) => {
            state.authIsLoading = action.payload;
        },
    },
});

export const { setServerIsAvailable, setAppIsLoading, setAuthIsLoading } = appSlice.actions;

export default appSlice.reducer;
