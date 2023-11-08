import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getBreedName } from "store/selectors";
import { useAppSelector } from "hooks/redux";

type Props = {
  onClick?: () => void;
};

const SearchBar = ({ onClick }: Props) => {
  const { t } = useTranslation();
  let isLoading = useAppSelector((state) => state.breedReducer.isLoading);
  let error = useAppSelector((state) => state.breedReducer.error);

  let breeds = useAppSelector(getBreedName);

  const [filteredData, setFilteredData] = useState<
    { name: string; id: string }[]
  >([]);
  const [wordEntered, setWordEntered] = useState<string>("");
  const [positionLeft, setPositionLeft] = useState<boolean>(false);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPositionLeft(true);

    const searchWord: string = event.target.value.trim();
    setWordEntered(searchWord);
    const newFilter: { name: string; id: string }[] = breeds.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = (): void => {
    setFilteredData([]);
    setWordEntered("");

    setPositionLeft(false);
  };

  const handleClick = (): void => {
    if (onClick !== undefined) {
      onClick();
    }
    clearInput();
  };

  const positionHandler = () => {
    setPositionLeft(!positionLeft);
  };

  const onFocusHandler = () => {
    setPositionLeft(true);
  };

  return (
    <>
      <div
        className="
          absolute lg:relative z-50
          left-0 top-[2.5rem]
          lg:left-auto lg:top-auto
          flex items-center
          px-6 lg:px-2
          h-10 lg:h-8 2xl:h-9
          w-full lg:w-40 2xl:w-48
          text-pale-white lg:text-pale-black
          bg-dark-green/60
          lg:bg-pale-black/30
          dark:bg-pale-white/30
          hover:shadow-[0_0_0_1px_#f8f8f8]
          [&:has(input:focus)]:shadow-[0_0_0_1px_#f8f8f8]
          lg:rounded-xl
          transition duration-300 ease-in-out
          "
      >
        {isLoading || error ? (
          <svg
            className="absolute animate-spin h-4 w-4 lg:h-5 lg:w-5 cursor-not-allowed"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (wordEntered === "" && breeds.length > 0) || error ? (
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute md:left-16 lg:left-2.5"
          />
        ) : (
          <FontAwesomeIcon
            onClick={clearInput}
            icon={faTrash}
            className="absolute 2xl:text-xl lg:ml-1 hover:scale-110 transition duration-150 ease-in-out cursor-pointer"
          />
        )}
        <input
          autoComplete="off"
          type="text"
          placeholder={
            error
              ? t("searchFetchError")
              : breeds.length === 0
              ? t("searchLoading")
              : t("searchBreeds")
          }
          value={wordEntered}
          onChange={handleFilter}
          onFocus={onFocusHandler}
          disabled={breeds.length === 0}
          className="
          ml-8 md:ml-24 lg:ml-6 2xl:ml-8
          w-4/5 lg:w-full
          bg-transparent
          placeholder-pale-white lg:placeholder-pale-black
          font-bold lg:font-normal
          text-sm lg:text-[0.9rem] 2xl:text-lg
          focus:outline-none
          disabled:cursor-not-allowed"
        />

        <FontAwesomeIcon
          onClick={handleClick}
          icon={faTimes}
          className="absolute right-8 md:right-16 lg:hidden py-0.5 px-1 bg-dirty-green/40 rounded cursor-pointer"
        />

        {filteredData.length !== 0 && positionLeft ? (
          <div
            className="
            searchResult
            absolute z-50
            left-0 lg:left-2.5 
            top-[2.5rem] lg:top-8 2xl:top-[2.25rem]
            py-1 2xl:py-1.5
            w-screen lg:w-[8.75rem] 2xl:w-[10.75rem]
            max-h-24 2xl:max-h-[7.5rem]
            border-[1px] border-pale-white rounded-b-md
            overflow-y-auto
            bg-[#D2DAB5] dark:bg-[#cfd5d6]"
          >
            {filteredData.slice(0, 15).map((value, key) => (
              <Link
                to={`/dogbreeds/${value.id}`}
                key={key}
                target="_blank"
                className="
                  block
                  pl-3 pr-2 2xl:pl-4 py-1 2xl:py-1.5 w-full
                  text-sm 2xl:text-base
                  font-open-sans
                  border-b-[1px] border-pale-white
                  last-of-type:border-0
                  hover:bg-black/20
                  transition duration-200 ease-in-out"
              >
                {value.name}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <div
        className={`${
          filteredData.length !== 0 && positionLeft
            ? ""
            : "hidden bg-transparent"
        } fixed left-0 top-0
        w-full h-full
        bg-black/50 transition duration-200 ease-in-out`}
        onClick={positionHandler}
      ></div>
    </>
  );
};

export default memo(SearchBar);
