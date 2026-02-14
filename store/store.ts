import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/user';
import appSlice from './slices/app';

const store = configureStore({
    reducer: {
        user: userSlice,
        app: appSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
