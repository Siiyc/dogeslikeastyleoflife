import breedInfoData from "../utils/breedInfoData";
import { IBreed } from "../models/IBreed";
interface InfoResolve {
  status: string,
  message: IBreed[]
}

export const getBreedInfoList = (): Promise<InfoResolve> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: breedInfoData
      });
    }, 500);
  });
};