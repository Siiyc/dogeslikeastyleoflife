import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  path: string;
  title: string;
  message: string;
  button: string;
};

const ErrorPage = ({ path, title, message, button }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className="
        screen
        fixed
        flex flex-col
        items-center justify-center
        flex-wrap
        gap-7 2xl:gap-10
        px-8
        w-screen
        bg-greenish-white dark:bg-dimmed-black
        text-2xl md:text-3xl lg:text-2xl 2xl:text-4xl
        text-dirty-green dark:text-light-navy"
    >
      <div className="text-center font-bold text-6xl lg:text-7xl 2xl:text-8xl">
        {t(title)}
      </div>
      <div className="my-4 md:my-8 w-3/4 md:w-2/3 text-center text-4xl lg:text-5xl 2xl:text-6xl">
        {t(message)}
      </div>
      <Link
        to={path}
        className="py-1.5 lg:py-2 2xl:py-3 px-3 lg:px-3 2xl:px-4 text-pale-white bg-dark-dirty-green dark:bg-dark-navy cursor-pointer rounded-md"
      >
        {t(button)}
      </Link>
    </div>
  );
};

export default memo(ErrorPage);
