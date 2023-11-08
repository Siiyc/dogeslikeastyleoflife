import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IBreed } from "models";

interface BreedState {
  breeds: IBreed[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BreedState = {
  breeds: [],
  isLoading: false,
  error: null,
};

export const breedReducer = createSlice({
  name: "breed",
  initialState,
  reducers: {
    fetchBreedsRequest: (state) => {
      state.breeds = [];
      state.isLoading = true;
      state.error = null;
    },
    fetchBreedsSuccess: (state, action: PayloadAction<IBreed[]>) => {
      //state.error = "Error34";
      state.breeds = action.payload;
      state.isLoading = false;
    },
    fetchBreedsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBreedsRequest, fetchBreedsSuccess, fetchBreedsFailure } =
  breedReducer.actions;

export default breedReducer.reducer;
