import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    addTime(state, action: PayloadAction<number>){
      state.tick += action.payload
    },
  },
});

export const { incrementTick, resetTick, addTime } = timerSlice.actions;
export default timerSlice.reducer;
