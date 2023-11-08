import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppSelector, useAppDispatch } from "hooks/redux";
import { getBreedId } from "store/selectors";
import { fetchImages } from "store/action-creators";

const RandomDog = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  let isLoading = useAppSelector((state) => state.breedReducer.isLoading);
  const breedsIds = useAppSelector(getBreedId);

  const [randomPage, setRandomPage] = useState<string>("akita");

  function updateRandomPage() {
    setRandomPage(breedsIds[Math.floor(Math.random() * breedsIds.length)].id);
  }

  const isButtonDisabled: boolean = Object.keys(breedsIds).length === 0;

  useEffect(() => {
    if (!isLoading && breedsIds.length > 0) {
      updateRandomPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, breedsIds]);

  const randomDogHandler = () => {
    updateRandomPage();
    dispatch(fetchImages(randomPage));
  };

  return (
    <Link to={`/dogbreeds/${randomPage}`}>
      <button
        disabled={isButtonDisabled}
        className="font-bold lg:font-normal disabled:cursor-not-allowed lg:uppercase"
        onClick={randomDogHandler}
      >
        {t("randomDog")}
      </button>
    </Link>
  );
};

export default memo(RandomDog);
