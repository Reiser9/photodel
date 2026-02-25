import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { LocalNotify } from "@/entities/notify";

type NotifyStateType = {
    localNotifies: LocalNotify[];
};

const initialState: NotifyStateType = {
    localNotifies: [],
};

export const notifySlice = createSlice({
    name: "notify",
    initialState,
    reducers: {
        addLocalNotify: (state, action: PayloadAction<LocalNotify>) => {
            state.localNotifies = [...state.localNotifies, action.payload];
        },
        removeLocalNotify: (state, action: PayloadAction<number>) => {
            state.localNotifies = state.localNotifies.filter(
                (item) => item.id !== action.payload,
            );
        },
    },
});

export const { addLocalNotify, removeLocalNotify } = notifySlice.actions;

export default notifySlice.reducer;
