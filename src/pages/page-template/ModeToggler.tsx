import { memo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import {
  faSun as solidSun,
  faMoon as solidMoon,
} from "@fortawesome/free-solid-svg-icons";

function ModeToggler() {
  const [isDark, setDark] = useState<boolean>(false);
  const [isHovered, setHovered] = useState<boolean>(false);

  const userTheme: string | null = localStorage.getItem("theme");
  const systemTheme: boolean = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  useEffect(() => {
    if ((!userTheme && systemTheme) || userTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeSwitch = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  const handleHoverOver = () => {
    setTimeout(() => setHovered(true), 0.15);
  };

  const handleHoverOut = () => {
    setTimeout(() => setHovered(false), 0.15);
  };

  return (
    <div
      className="w-6 lg:w-16 2xl:w-[4.5rem]"
      onMouseOver={handleHoverOver}
      onMouseOut={handleHoverOut}
    >
      <input
        type="checkbox"
        className="checkbox absolute invisible"
        id="checkbox"
        checked={isDark}
        onChange={() => {}}
      />
      <label
        htmlFor="checkbox"
        className="
          flex justify-center lg:justify-between items-center
          h-6 lg:h-8  2xl:h-9
          lg:text-2xl
          rounded-full
          cursor-pointer
          bg-[#e4e9d1cc]
          transition ease-in-out duration-400
        "
        onClick={themeSwitch}
      >
        <FontAwesomeIcon
          icon={isHovered ? faMoon : solidMoon}
          className="
            moon
            absolute lg:relative
            ml-0.5 lg:ml-1 2xl:ml-1.5
            pr-[3px] lg:pr-0
            2xl:text-3xl
            text-transparent lg:text-[#f1c40f]"
        />
        <FontAwesomeIcon
          icon={isHovered ? faSun : solidSun}
          className="
            sun
            lg:mr-1.5
            lg:text-xl 2xl:text-2xl
            text-[#f39c12]"
        />
        <div
          className="
            ball 
            absolute hidden lg:block
            ml-0.5
            w-7 2xl:w-8
            h-7 2xl:h-8
            bg-dimmed-green dark:bg-dimmed-blue
            rounded-full
            transition duration-400 ease-in-out"
          onClick={themeSwitch}
        ></div>
      </label>
    </div>
  );
}

export default memo(ModeToggler);
