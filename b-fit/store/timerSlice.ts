import { createSlice } from "@reduxjs/toolkit";

interface TimerState {
  tick: number;
}

const initialState: TimerState = {
  tick: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    incrementTick(state) {
      state.tick += 1;
    },
    resetTick(state) {
      state.tick = 0;
    },
  },
});

export const { incrementTick, resetTick } = timerSlice.actions;
export default timerSlice.reducer;
