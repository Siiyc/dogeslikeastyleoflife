import { getCatalog, getBreedInfoList } from "api";
import { AppDispatch } from "store";
import { IBreed } from "models/IBreed";
import {
  fetchBreedsRequest,
  fetchBreedsSuccess,
  fetchBreedsFailure,
} from "store/reducers/breedSlice";

export const fetchBreeds = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchBreedsRequest());
    interface BreedInfo {
      status: string;
      message: IBreed[];
      error?: Error;
    }

    interface CatalogInfo {
      status: string;
      message: string[];
    }

    let info: BreedInfo = await getBreedInfoList();
    let catalog: CatalogInfo = await getCatalog();

    const breedsInfoExt: IBreed[] = info.message;
    const finalInfo: IBreed[] = [];

    breedsInfoExt.forEach((name) => {
      if (catalog.message.includes(name.id)) {
        finalInfo.push(name);
      }
    });

    dispatch(fetchBreedsSuccess(finalInfo));
  } catch (e: any) {
    dispatch(fetchBreedsFailure(e.message));
  }
};
