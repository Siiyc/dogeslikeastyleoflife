import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  [key: string]: boolean;
}

const initialState: ToggleState = {};

export const toggleReducer = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    switchToggle: (state, action: PayloadAction<string>) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const { switchToggle } = toggleReducer.actions;

export default toggleReducer.reducer;
