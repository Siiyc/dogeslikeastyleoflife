import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  images: [string] | [];
  isLoading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  images: [],
  isLoading: false,
  error: null,
};

export const imageReducer = createSlice({
  name: "image",
  initialState,
  reducers: {
    fetchImagesRequest: (state) => {
      state.images = [];
      state.isLoading = true;
      state.error = null;
    },
    fetchImagesSuccess: (state, action: PayloadAction<[string]>) => {
      state.images = action.payload;
      state.isLoading = false;
    },
    fetchImagesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchImagesRequest, fetchImagesSuccess, fetchImagesFailure } =
  imageReducer.actions;

export default imageReducer.reducer;
