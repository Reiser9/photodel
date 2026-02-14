import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { VerificationCodeData } from '@/entities/user';

type UserStateType = {
    isAuth: boolean;
    verificationCodeData: VerificationCodeData | null;
};

const initialState: UserStateType = {
    isAuth: false,
    verificationCodeData: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        initVerificationCodeData: (state, action: PayloadAction<VerificationCodeData | null>) => {
            state.verificationCodeData = action.payload;
        },
        setUserData: (state) => {
            state.isAuth = false;
            state.verificationCodeData = null;
        },
    },
});

export const { setIsAuth, initVerificationCodeData, setUserData } = userSlice.actions;

export default userSlice.reducer;
