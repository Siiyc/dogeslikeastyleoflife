import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  updateFilterValues,
  updateCheckboxValues,
  clearFilterValues,
} from "store/reducers/filterSlice";
import { getFilterValues, getCheckboxValues } from "store/selectors";
import { ICheckbox } from "models";

type Props = {
  onClick: () => void;
};

type Options = {
  [key: string]: boolean;
};

const Filters = ({ onClick }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  let loading = useAppSelector((state) => state.breedReducer.isLoading);

  let filterValues = useAppSelector(getFilterValues);
  let checkboxValues = useAppSelector(getCheckboxValues);

  const onCheckboxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue: string = e.target.value;
    let newFilterValues = { ...filterValues };
    let newCheckboxValues: ICheckbox = JSON.parse(
      JSON.stringify(checkboxValues)
    );

    let [param, value]: string[] = filterValue.split(": ");

    let valuesToNum: number[] | number = defaultFilters[
      filterOptions.find((opt) => opt.name === param)!.options.indexOf(value)
    ]
      .split(",")
      .map((x) => +x);

    let option: Options =
      newCheckboxValues[param as keyof typeof newCheckboxValues];

    if (e.target.checked) {
      newFilterValues[param as keyof typeof newFilterValues] =
        newFilterValues[param as keyof typeof newFilterValues].concat(
          valuesToNum
        );
    } else {
      const valuesToDelSet = new Set(valuesToNum);
      newFilterValues[param as keyof typeof newFilterValues] = newFilterValues[
        param as keyof typeof newFilterValues
      ].filter((x) => !valuesToDelSet.has(x));
    }
    option[value] = !option[value];
    dispatch(updateFilterValues({ ...newFilterValues }));
    dispatch(updateCheckboxValues(newCheckboxValues));
  };

  const [positionLeft, setPosition] = useState(true);

  function handleClick() {
    onClick();
    setPosition(!positionLeft);
  }

  const clearFiltersHandler = () => {
    dispatch(clearFilterValues());
  };

  const filterOptions: { options: string[]; name: string; tooltip?: string }[] =
    [
      { options: ["small", "medium", "large"], name: "size" },
      {
        options: ["low", "moderate", "high"],
        name: "energyLvl",
      },
      {
        options: ["easy", "average", "difficult"],
        name: "easeTr",
        tooltip: "tooltip1",
      },
      {
        options: ["minimum", "reasonable", "demanding"],
        name: "groomReqs",
        tooltip: "tooltip2",
      },
    ];

  const defaultFilters: string[] = ["1, 2", "3", "4, 5"];

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="lg:sticky z-50 top-0">
      <div
        className="fixed left-0 top-0 w-full h-full bg-pale-black/50"
        onClick={handleClick}
      ></div>
      <div
        className={`
          ${positionLeft ? "" : "right"}
          filters
          absolute z-50
          flex flex-col
          w-full md:w-fit
          px-10 pt-5 pb-8
          bg-greenish-yellow dark:bg-[#9c9fa8]
          font-roboto text-dirty-green
          dark:text-dirty-navy
          rounded-b-lg lg:rounded-b-none lg:rounded-br-lg
          `}
      >
        <button
          className="
            self-end
            px-2
            bg-grayish-yellow dark:bg-[#878997]
            hover:bg-grayish-yellow-hover dark:hover:bg-[#707183]
            rounded
            transition duration-300 ease-in-out
            cursor-pointer"
          onClick={clearFiltersHandler}
        >
          {t("resetFilters")}
        </button>

        {filterOptions.map((category) => (
          <div key={category.name}>
            <div className="mt-[1.2rem] font-bold text-xl">
              {t(category.name)}
              {category.tooltip ? (
                <button
                  className="
                      group hidden lg:inline-flex 
                      ml-2 
                      justify-center items-center
                      w-6 h-6 
                      bg-dirty-green dark:bg-dirty-navy
                      hover:bg-dark-dirty-green dark:hover:bg-dark-navy
                      font-bold text-[1.25rem]
                      text-[#eaede2] dark:text-[#c0c5d2]
                      rounded-full
                      transition duration-200 ease-in-out transform hover:-translate-y-1"
                >
                  ?
                  <span className="hidden absolute z-50 group-hover:block">
                    <span
                      className="
                          w-40
                          p-2 mb-8
                          bg-dirty-green dark:bg-dirty-navy
                          text-greenish-yellow text-xs
                          rounded-md
                          tooltipText"
                    >
                      {t(category.tooltip)}
                    </span>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="arrow text-dirty-green dark:text-dirty-navy"
                    />
                  </span>
                </button>
              ) : null}
            </div>
            <div>
              {category.options.map((option) => (
                <div key={option} className="group">
                  <input
                    className="
                        border-2 border-dirty-green dark:border-dirty-navy
                        group-hover:border-dark-dirty-green dark:group-hover:border-light-navy
                        rounded-full
                        mb-[1.5px]
                        h-2 w-2
                        appearance-none
                        cursor-pointer
                        checked:bg-checkbox-green
                        transition duration-200 ease-in-out"
                    type="checkbox"
                    id={option}
                    value={`${category.name}: ${option}`}
                    checked={
                      checkboxValues[
                        category.name as keyof typeof checkboxValues
                      ][option as keyof typeof Option]
                    }
                    onChange={onCheckboxChanged}
                  />
                  <label
                    htmlFor={option}
                    className="cursor-pointer ml-1
                    group-hover:text-dark-dirty-green dark:group-hover:text-light-navy
                    transition duration-200 ease-in-out"
                  >
                    {t(option)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          className="
            mt-6
            w-full h-10
            bg-dirty-green dark:bg-dirty-navy
            hover:bg-dark-dirty-green dark:hover:bg-dark-navy
            rounded-lg
            text-xl font-bold text-greenish-white
            transition duration-300 ease-in-out"
          onClick={handleClick}
        >
          {t("back")}
        </button>
      </div>
    </div>
  );
};

export default Filters;
