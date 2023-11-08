import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

import ScrollToTop from "components/ScrollToTop";

const About = () => {
  const { t } = useTranslation();

  // const usedTools: string[] = [
  //   "React",
  //   "Redux Toolkit",
  //   "Redux Persist",
  //   "TypeScript",
  //   "i18next",
  //   "Tailwind CSS",
  //   "Font Awesome",
  // ];

  //const usedAPIs: string[] = ["Dog API", "Wikipedia", "PetFinder"];

  // interface forLists {
  //   name: string;
  //   content: string[];
  // }

  // const lists: forLists[] = [
  //   {
  //     name: "tools",
  //     content: usedTools,
  //   },
  //   {
  //     name: "apis",
  //     content: usedAPIs,
  //   },
  // ];

  return (
    <div
      className="lg:flex lg:items-center lg:flex-col
        p-10 md:py-16 2xl:py-24
        w-screen min-h-screen
        bg-greenish-white dark:bg-dimmed-black
        text-pale-black dark:text-pale-white
        font-open-sans font-sans
        cursor-default
        transition duration-300 ease-in-out"
    >
      <ScrollToTop />
      <div className="flex flex-col items-center lg:w-1/2">
        <a
          href="https://github.com/Siiyc/dogeslikeastyleoflife"
          target="_blank"
          rel="noopener noreferrer"
          className="
            my-4 md:mt-8
            text-xl md:text-2xl
            hover:text-pale-black/80 hover:dark:text-pale-white/80
            transition duration-200 ease-in-out
            cursor-pointer"
        >
          {t("viewGithub")}
          <FontAwesomeIcon icon={faChevronCircleRight} className="ml-2" />
        </a>
        <div className="mt-2 text-2xl md:text-3xl">{t("usedTools")}</div>
        <div className="list-disc list-inside text-xl md:text-2xl">
          <li className="my-3 lg:my-5">
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                hover:text-pale-black/80 hover:dark:text-pale-white/80
                transition duration-200 ease-in-out
                cursor-pointer"
            >
              React
            </a>
          </li>
          <li className="my-3 lg:my-5">
            <a
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                hover:text-pale-black/80 hover:dark:text-pale-white/80
                transition duration-200 ease-in-out
                cursor-pointer"
            >
              Redux Toolkit
            </a>
          </li>
        </div>
        <div className="mt-2 text-2xl md:text-3xl">{t("usedAPIs")}</div>
        <div className="list-disc list-inside text-xl md:text-2xl">
          <li className="my-3 lg:my-5">
            <a
              href="https://dog.ceo/dog-api/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                hover:text-pale-black/80 hover:dark:text-pale-white/80
                transition duration-200 ease-in-out
                cursor-pointer"
            >
              Dog API
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default memo(About);
