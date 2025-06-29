import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import timerReducer from "./timerSlice"

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    timer: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
