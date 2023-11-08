import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div
      className="home-page-background
        flex justify-center items-center
        md:items-end flex-col
        px-8 md:pr-20 2xl:pr-60
        w-screen screen
        text-pale-white font-open-sans font-sans
        bg-[url('/src/assets/images/background.jpg')] bg-cover
        cursor-default"
    >
      <div
        className="w-full md:w-4/5 lg:w-1/2 xl:w-[45%] 2xl:w-[35%]
        p-6 pb-4 2xl:p-10 2xl:pb-8
        bg-[#171b0a80] dark:bg-[#0a0c1b80]
        rounded-[2rem]"
      >
        <div className="font-bold text-3xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl cursor-default">
          {t("dogsGallery")}
        </div>
        <div
          className="my-4 md:my-6 lg:my-8
            text-lg md:text-2xl lg:text-lg xl:text-xl 2xl:text-3xl md:font-medium
            cursor-default
          "
        >
          {t("homeMain")}
        </div>
        <div
          className="flex items-center justify-around w-full
            md:text-2xl lg:text-lg 2xl:text-3xl font-semibold
          "
        >
          <Link
            to="/dogbreeds"
            className="bg-dark-green dark:bg-pale-black hover:brightness-90
              py-1.5 2xl:py-2
              px-3 2xl:px-5
              rounded-lg
              lowercase
              transform hover:scale-105
              transition duration-300 ease-in-out
            "
          >
            {t("browseButton")}
          </Link>
          <a
            href="https://github.com/Siiyc/dogeslikeastyleoflife"
            target="_blank"
            rel="noopener noreferrer"
            className="md:order-first
              hover:text-[#c4d291] dark:hover:text-[#f8f8f8cc]
              drop-shadow-[1.5px_1.5px_1px_rgba(0,0,0,0.5)]
              hover:drop-shadow-[1.5px_1.5px_1px_rgba(15,3,107,0.5)]
              transition duration-150 ease-in-out"
          >
            GitHub
            <FontAwesomeIcon icon={faChevronCircleRight} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
