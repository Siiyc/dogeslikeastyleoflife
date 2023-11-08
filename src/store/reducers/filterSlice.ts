import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFilter, ICheckbox } from "models";

interface FilterState {
  filterValues: IFilter;
  checkboxValues: ICheckbox;
  currentBreed: string;
}

const initialState: FilterState = {
  filterValues: {
    size: [],
    energyLvl: [],
    easeTr: [],
    groomReqs: [],
  },
  checkboxValues: {
    size: {
      small: false,
      medium: false,
      large: false,
    },
    energyLvl: {
      low: false,
      moderate: false,
      high: false,
    },
    easeTr: {
      easy: false,
      average: false,
      difficult: false,
    },
    groomReqs: {
      minimum: false,
      reasonable: false,
      demanding: false,
    },
  },
  currentBreed: "",
};

export const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    clearFilterValues: () => initialState,
    updateFilterValues: (state, action: PayloadAction<IFilter>) => {
      state.filterValues = action.payload;
    },
    updateCheckboxValues: (state, action: PayloadAction<ICheckbox>) => {
      state.checkboxValues = action.payload;
    },
    updateCurrentBreed: (state, action: PayloadAction<string>) => {
      state.currentBreed = action.payload;
    },
  },
});

export const {
  clearFilterValues,
  updateFilterValues,
  updateCheckboxValues,
  updateCurrentBreed,
} = filterReducer.actions;

export default filterReducer.reducer;
