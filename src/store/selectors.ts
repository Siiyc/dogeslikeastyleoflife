import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";
import { IBreed } from "../models";

const getAllBreeds = (state: RootState) => state.breedReducer.breeds;

export const getBreedId = createSelector([getAllBreeds], (getAllBreeds) => {
  return getAllBreeds.map((breed) => ({
    id: breed.id,
  }));
});

export const getBreedName = createSelector([getAllBreeds], (getAllBreeds) => {
  return getAllBreeds.map((breed) => ({
    name: breed.name,
    id: breed.id,
  }));
});

export const getCurrentBreed = (state: RootState) =>
  state.filtersReducer.currentBreed;

export const getBreedById = createSelector(
  [getAllBreeds, getCurrentBreed],
  (breeds, breedId) => breeds.find((breed) => breed.id === breedId)
);

export const getBreedPhotos = createSelector(
  [(state: RootState) => state.imageReducer.images],
  (images) => {
    return images;
  }
);

export const getCardProps = createSelector([getAllBreeds], (getAllBreeds) => {
  return getAllBreeds.map((breed) => ({
    id: breed.id,
    cardDesc: breed.cardDesc,
    name: breed.name,
    cardImg: breed.cardImg,
  }));
});

const getAllFilterValues = (state: RootState) =>
  state.filtersReducer.filterValues;

export const getFilterValues = createSelector(
  [getAllFilterValues],
  (getAllFilterValues) => {
    const filterValues = {
      size: getAllFilterValues.size,
      energyLvl: getAllFilterValues.energyLvl,
      groomReqs: getAllFilterValues.groomReqs,
      easeTr: getAllFilterValues.easeTr,
    };
    return filterValues;
  }
);

export const getFilteredBreeds = createSelector(
  [getAllFilterValues, getAllBreeds],
  (getAllFilterValues, getAllBreeds) => {
    let filteredBreeds: string[] = [];

    getAllBreeds.forEach((breed: IBreed) => {
      if (
        (getAllFilterValues.size.length === 0 ||
          getAllFilterValues.size.includes(breed.size)) &&
        (getAllFilterValues.energyLvl.length === 0 ||
          getAllFilterValues.energyLvl.includes(breed.energyLvl)) &&
        (getAllFilterValues.easeTr.length === 0 ||
          getAllFilterValues.easeTr.includes(breed.easeTr)) &&
        (getAllFilterValues.groomReqs.length === 0 ||
          getAllFilterValues.groomReqs.includes(breed.groomReqs))
      ) {
        filteredBreeds.push(breed.id);
      }

      if (
        getAllFilterValues.size.length === 0 &&
        getAllFilterValues.energyLvl.length === 0 &&
        getAllFilterValues.easeTr.length === 0 &&
        getAllFilterValues.groomReqs.length === 0
      ) {
        filteredBreeds = [];
      }
    });
    return filteredBreeds;
  }
);

const getAllCheckboxValues = (state: RootState) =>
  state.filtersReducer.checkboxValues;

export const getCheckboxValues = createSelector(
  [getAllCheckboxValues],
  (getAllCheckboxValues) => {
    const checkboxValues = {
      size: getAllCheckboxValues.size,
      energyLvl: getAllCheckboxValues.energyLvl,
      groomReqs: getAllCheckboxValues.groomReqs,
      easeTr: getAllCheckboxValues.easeTr,
    };
    return checkboxValues;
  }
);
