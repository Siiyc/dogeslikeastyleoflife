import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import RandomDog from "./RandomDog";

type Props = {
  mobileMeniIsClosed: boolean;
  onCloseMobileMenu: () => void;
};

export const MobileMenu = ({
  mobileMeniIsClosed,
  onCloseMobileMenu,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={`
        absolute
        flex flex-col items-start
        inset-x-0 top-10 bottom-0
        w-full h-[100vh]
        bg-pale-black/50
        text-pale-black dark:text-pale-white
        text-3xl font-open-sans font-bold
        transition ease-in-out duration-300`}
      onClick={onCloseMobileMenu}
    >
      <div
        className={`
          filters ${mobileMeniIsClosed ? "right" : ""}
          w-full
          pt-8 pb-10 px-10
          drop-shadow-xl
          rounded-b-sm
          bg-greenish-yellow dark:bg-pale-black`}
      >
        <Link to="/dogbreeds">{t("dogBreeds")}</Link>
        <div className="w-full h-[1.5px] my-6 bg-pale-black dark:bg-pale-white"></div>
        <RandomDog />
        <div className="w-full h-[1.5px] my-6 bg-pale-black dark:bg-pale-white"></div>
        <Link to="/about">{t("about")}</Link>
        <div className="w-full h-[1.5px] my-6 bg-pale-black dark:bg-pale-white"></div>
        Github
      </div>
    </div>
  );
};

export default memo(MobileMenu);
