import React, { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDog,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import ModeToggler from "./ModeToggler";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import RandomDog from "./RandomDog";

import Toggle from "components/Toggle";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { switchToggle } from "store/reducers/toggleSlice";

const Header: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const mobileMenuToggle = "mobileMenuToggle";
  const mobileSearchToggle = "mobileSearchToggle";
  const showMobileMenu = useAppSelector(
    (state) => state.toggleReducer[mobileMenuToggle]
  );

  const [mobileMeniIsClosed, setMobileMeniIsClosed] = useState<boolean>(true);

  const switchMobileMenuHandler = () => {
    setMobileMeniIsClosed(!mobileMeniIsClosed);
    setTimeout(() => {
      dispatch(switchToggle(mobileMenuToggle));
    }, 300);
  };

  const switchMobileSearchHandler = () => {
    setTimeout(() => {
      dispatch(switchToggle(mobileSearchToggle));
    }, 300);
  };

  const changeLanguageHandler = () => {
    i18next.changeLanguage(t("code"));
  };

  return (
    <React.Fragment>
      <div
        className="
          sticky z-50 top-0 lg:static
          flex items-center justify-between
          lg:gap-4 2xl:gap-6
          h-10 lg:h-12 2xl:h-14 w-screen
          px-6 md:px-14 lg:px-16 xl:px-40 2xl:px-64
          bg-dark-green dark:bg-dimmed-gray
          font-open-sans text-base 2xl:text-xl
          text-pale-black dark:text-pale-white
          transition ease-in-out duration-300
        "
      >
        <Toggle id={mobileMenuToggle}>
          <MobileMenu
            mobileMeniIsClosed={mobileMeniIsClosed}
            onCloseMobileMenu={switchMobileMenuHandler}
          />
        </Toggle>
        <FontAwesomeIcon
          className="lg:hidden w-[15px] md:w-[20px] text-pale-white text-xl"
          icon={showMobileMenu ? faTimes : faBars}
          onClick={switchMobileMenuHandler}
        />

        <FontAwesomeIcon
          className="lg:hidden p-1 text-sm text-pale-white
          bg-pale-white/40 rounded-full"
          icon={faSearch}
          onClick={switchMobileSearchHandler}
        />
        <Toggle id={mobileSearchToggle}>
          <SearchBar onClick={switchMobileSearchHandler} />
        </Toggle>

        <Link
          to="/"
          className="
            lg:order-first
            font-graduate
            text-xl 2xl:text-2xl
            text-pale-white hover:text-pale-black dark:hover:text-light-navy
            transition ease-in-out duration-200
            cursor-pointer
          "
        >
          <FontAwesomeIcon
            icon={faDog}
            className="hidden sm:inline-block mr-2"
          />
          ReDoggos
        </Link>

        <ModeToggler />

        <div className="hidden lg:block">
          <SearchBar />
        </div>

        <Link
          to="/about"
          className={`hidden lg:block ml-auto
            hover:text-pale-white dark:hover:text-light-navy
            uppercase
            transition ease-in-out duration-200
            ${
              location.pathname === "/about"
                ? " underline underline-offset-[16.5px] 2xl:underline-offset-[18px]"
                : ""
            }
          `}
        >
          {t("about")}
        </Link>
        <Link
          to="/dogbreeds"
          className={`hidden lg:block
            hover:text-pale-white dark:hover:text-light-navy
            uppercase
            transition ease-in-out duration-200
            ${
              location.pathname === "/dogbreeds"
                ? " underline underline-offset-[16.5px] 2xl:underline-offset-[18px]"
                : ""
            }
          `}
        >
          {t("dogBreeds")}
        </Link>
        <div
          className="hidden lg:block
          hover:text-pale-white dark:hover:text-light-navy
          transition ease-in-out duration-200"
        >
          <RandomDog />
        </div>

        <button
          className="
            text-pale-white dark:text-light-navy
            cursor-pointer
            transition duration-300 ease-in-out
          "
          onClick={changeLanguageHandler}
        >
          {t("language")}
        </button>
      </div>
    </React.Fragment>
  );
};

export default memo(Header);
