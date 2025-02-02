import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import exerciseUseSlice from "./slice/exerciseSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        exercixeUse: exerciseUseSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
