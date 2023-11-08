import { getBreedImages } from "api";
import { AppDispatch } from "store";
import {
  fetchImagesRequest,
  fetchImagesSuccess,
  fetchImagesFailure,
} from "store/reducers/imageSlice";

export const fetchImages = (breed: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchImagesRequest());

    let res = await getBreedImages(breed);

    dispatch(fetchImagesSuccess(res.message));
  } catch (e: any) {
    dispatch(fetchImagesFailure(e.message));
  }
};
