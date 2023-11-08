import { useTranslation } from "react-i18next";

type Props = {
  n: number;
  stat: string;
};

export const DogStats = ({ n, stat }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="my-2 text-base md:text-lg">
      <div className="font-semibold">{t(stat)}</div>
      <div className="flex flex-row h-7 my-2 rounded-full">
        {[0, 1, 2, 3, 4].map((el) => (
          <div
            className={`w-1/5 border-r-[3px] border-pale-white dark:border-dimmed-black
            first:rounded-l-full last:rounded-r-full
             ${
               n > el ? "bg-dark-green dark:bg-light-navy" : "bg-concrete-gray"
             }`}
            key={el}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DogStats;
