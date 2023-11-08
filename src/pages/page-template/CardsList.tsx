import { memo } from "react";

import Card from "./Card";

import { useAppSelector } from "hooks/redux";
import Loader from "components/Loader";
import ErrorIndicator from "components/ErrorIndicator";
import ZeroMatches from "components/ZeroMatches";
import { getCardProps, getFilteredBreeds } from "store/selectors";

const CardsList = () => {
  let isLoading = useAppSelector((state) => state.breedReducer.isLoading);
  let error = useAppSelector((state) => state.breedReducer.error);
  let cards = useAppSelector(getCardProps);
  let filteredBreeds = useAppSelector(getFilteredBreeds);

  let filterValues = useAppSelector(
    (state) => state.filtersReducer.filterValues
  );

  let isFiltered = filteredBreeds.length > 0;
  let isFilters =
    filterValues.size.length > 0 ||
    filterValues.energyLvl.length > 0 ||
    filterValues.groomReqs.length > 0 ||
    filterValues.easeTr.length > 0;

  if (isLoading) {
    return (
      <div className="h-[70vh]">
        <Loader />
      </div>
    );
  }

  if (!isFiltered && isFilters) {
    return <ZeroMatches />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <ul
      className="
        flex flex-wrap justify-center
        gap-6 xl:gap-10 2xl:gap-16
        w-full
        lg:mx-8 xl:mx-16 2xl:mx-0"
    >
      {cards.map((breed) =>
        isFiltered ? (
          filteredBreeds.map((filtered: string) =>
            breed.id === filtered ? <Card key={breed.id} {...breed} /> : null
          )
        ) : (
          <Card key={breed.id} {...breed} />
        )
      )}
    </ul>
  );
};

export default memo(CardsList);
