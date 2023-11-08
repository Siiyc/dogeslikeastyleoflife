import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilter } from "@fortawesome/free-solid-svg-icons";

import CardsList from "./page-template/CardsList";
import Filters from "./page-template/Filters";

import ScrollToTop from "components/ScrollToTop";
import Toggle from "components/Toggle";
import { switchToggle } from "store/reducers/toggleSlice";
import { useAppDispatch } from "hooks/redux";

const DogBreeds = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const filtersToggle = "filtersToggle";

  const switchFiltersHandler = () => {
    setTimeout(() => {
      dispatch(switchToggle(filtersToggle));
    }, 200);
  };

  return (
    <div
      className="
        min-h-screen w-full
        bg-greenish-white dark:bg-dimmed-black
        font-open-sans font-serif
        cursor-default"
    >
      <ScrollToTop />
      <Toggle id={filtersToggle}>
        <Filters onClick={switchFiltersHandler} />
      </Toggle>
      <div
        className="
          flex flex-col
          content-start items-start
          px-6 xl:px-12
          pt-8 xl:pt-10
        "
      >
        <FontAwesomeIcon
          icon={faBars}
          onClick={switchFiltersHandler}
          className="
            hidden lg:block
            fa-2x
            ml-8 mt-4
            text-dirty-green dark:text-light-navy
            hover:text-dark-dirty-green dark:hover:text-dark-navy
            cursor-pointer
            transition duration-200 ease-in-out
          "
        />
        <div
          className="
            flex flex-wrap justify-center
            gap-6 xl:gap-10 2xl:gap-16
            w-full h-full
            lg:p-8 xl:px-32 2xl:py-12
          "
        >
          <button
            onClick={switchFiltersHandler}
            className="
              lg:hidden
              flex justify-center items-center
              w-full h-8 md:h-10
              mx-10
              rounded-lg
              bg-pale-white dark:bg-dimmed-gray
              text-lg md:text-xl
              text-dark-green dark:text-light-navy
              font-roboto font-bold
            "
          >
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            {t("filterBreeds")}
          </button>
          <CardsList />
        </div>
      </div>
    </div>
  );
};

export default memo(DogBreeds);
