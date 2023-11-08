import { Link } from "react-router-dom";
import { memo } from "react";

type Props = {
  cardDesc: string;
  id: string;
  name: string;
  cardImg: string;
};

const Card = ({ cardDesc, id, name, cardImg }: Props) => (
  <Link
    to={`/dogbreeds/${id}`}
    className="
      flex justify-center flex-wrap
      w-36 h-56
      md:w-52 md:h-80
      p-3.5 md:p-6
      bg-light-green dark:bg-dark-navy
      rounded-md border-2 md:border-4
      border-dark-green dark:border-light-navy
      text-pale-black dark:text-pale-white
      cursor-pointer
      transition duration-300 ease-in-out
      hover:-translate-y-1 hover:scale-105
      hover:border-light-green dark:hover:border-dark-navy"
    key={id}
  >
    <img
      src={cardImg}
      alt="cover"
      className="object-cover h-28 md:h-40 w-full md:w-40 md:mb-2 rounded"
    />
    <div className="flex justify-center items-center flex-wrap mb-4 mt-1.5 text-center">
      <div className="mb-1 text-xl md:text-3xl leading-6 md:leading-[2rem] font-caveat uppercase">
        {name}
      </div>
      <div className="text-xs md:text-base leading-[0.85rem] md:leading-4 font-open-sans">
        {cardDesc}
      </div>
    </div>
  </Link>
);

export default memo(Card);
