import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/user";
import appSlice from "./slices/app";
import notifySlice from "./slices/notify";

const store = configureStore({
    reducer: {
        user: userSlice,
        app: appSlice,
        notify: notifySlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
