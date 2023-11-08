import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton ? (
        <button
          onClick={scrollToTop}
          className="
            fixed z-50
            bottom-5 lg:bottom-8 2xl:bottom-14
            right-3 lg:right-14 2xl:right-24
            aspect-square
            w-11 lg:w-12 2xl:w-16
            bg-dark-green dark:bg-light-navy 
            hover:bg-[#81933e] dark:hover:bg-dark-navy
            rounded-md
            text-lg 2xl:text-xl
            text-pale-white
            cursor-pointer
            transition duration-150 ease-in-out"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      ) : null}
    </>
  );
};

export default ScrollToTop;
