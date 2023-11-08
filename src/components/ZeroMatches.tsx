import { useTranslation } from "react-i18next";

import { clearFilterValues } from "store/reducers/filterSlice";
import { useAppDispatch } from "hooks/redux";

const ZeroMatches = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const clearFiltersHandler = () => {
    dispatch(clearFilterValues());
  };

  return (
    <div
      className="
        w-4/5 mt-10
        text-5xl lg:text-6xl 2xl:text-7xl
        text-center
        text-dirty-green dark:text-light-navy
        cursor-default"
    >
      {t("zeroMatches0")}
      <span className="whitespace-nowrap"> {t("zeroMatches1")}</span>
      <div className="mt-10 lg:mt-16 text-4xl lg:text-5xl 2xl:text-6xl">
        {t("zeroMatches2")}
        <button
          onClick={clearFiltersHandler}
          className="underline lowercase text-dark-dirty-green dark:text-[#386ab4]
            hover:text-[#3b402e] dark:hover:text-dark-navy
            transition duration-200 ease-in-out"
        >
          {t("resetFilters")}
        </button>
      </div>
    </div>
  );
};

export default ZeroMatches;
