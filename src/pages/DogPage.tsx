import { useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useParams } from "react-router-dom";

import ErrorPage from "./ErrorPage";
import DogStats from "./page-template/DogStats";

import Loader from "components/Loader";
import ScrollToTop from "components/ScrollToTop";
import { useAppSelector, useAppDispatch } from "hooks/redux";
import { getBreedById, getBreedPhotos } from "store/selectors";
import { updateCurrentBreed } from "store/reducers/filterSlice";
import { fetchImages } from "store/action-creators";
import { IBreed } from "models/IBreed";

const DogPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  let loading = useAppSelector((state) => state.breedReducer.isLoading);

  let images: string[] | undefined = useAppSelector(getBreedPhotos);
  let info: IBreed | undefined = useAppSelector(getBreedById);

  let params = useParams();
  let id: string | undefined = params!.name;

  useEffect(() => {
    if (id) {
      dispatch(updateCurrentBreed(id));
    }
  });

  useEffect(() => {
    if (info) {
      dispatch(fetchImages(info.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, info]);

  if (!loading && !info) {
    return (
      <ErrorPage
        path="/dogbreeds"
        title="breedNotFound"
        message="errorPageBreedPage"
        button="browseButton"
      />
    );
  }

  const topics: string[] = [
    "history",
    "temperament",
    "upkeep",
    "health",
    "gallery",
  ];

  const stats: string[] = [
    "energyLvl",
    "exReqs",
    "playfulness",
    "affLvl",
    "frToDogs",
    "frToPets",
    "frToStr",
    "watchfulness",
    "easeTr",
    "groomReqs",
    "heatSens",
    "vocality",
  ];

  return !loading && info && images ? (
    <div
      className="
        flex justify-center flex-wrap
        gap-y-4 lg:gap-y-6 xl:gap-y-8
        p-6 md:px-10 md:py-8 lg:py-6 lg:px-16 xl:px-36 2xl:px-60
        font-open-sans
        text-pale-black dark:text-pale-white
        bg-greenish-white dark:bg-dimmed-black
        transition duration-300 ease-in-out"
    >
      <ScrollToTop />

      <div className="flex flex-col w-[90vw] lg:w-1/3">
        <div
          className="
            h-[30vh] md:h-[35vh]
            rounded-lg
            bg-cover bg-top"
          style={{ backgroundImage: `url(${info.headImg})` }}
        ></div>
        <div className="mt-1 text-center font-roboto text-dirty-green dark:text-[#536375]">
          {info.subDesc}
        </div>
      </div>

      <div
        className="
            flex justify-start flex-wrap
            lg:w-[64%]
            lg:px-5 xl:px-8
            lg:py-5 lg:ml-5
            lg:bg-pale-black/5
            dark:lg:bg-pale-white/10
            rounded-xl"
      >
        <div
          className="
              mb-3 md:mb-4
              text-6xl md:text-7xl 2xl:text-8xl
              text-light-green dark:text-light-navy
              font-caveat uppercase
              rounded-[3rem]
              drop-shadow-[2px_2px_3px_rgba(141,162,66,0.3)]
              dark:drop-shadow-[2px_2px_3px_rgba(3,17,23,0.3)]"
        >
          {info.name}
        </div>
        <div className="font-ibm">{info.desc}</div>
      </div>

      <div className="w-full">
        <div className="text-lg lg:text-xl font-open-sans">{t("genStats")}</div>

        <div
          className="
            grid md:grid-cols-2
            lg:grid-cols-3 2xl:grid-cols-4
            items-end
            md:gap-x-16 xl:gap-x-32"
        >
          {stats.map((val) => (
            <DogStats
              n={info![val as keyof typeof info]}
              stat={val}
              key={val}
            />
          ))}
        </div>
      </div>

      <div
        className="
            flex justify-center
            items-center flex-wrap
            w-full
            xl:mt-3
            text-lg xl:text-xl"
      >
        <div className="md:hidden w-1/4 h-px mb-4 bg-pale-black dark:bg-pale-white"></div>
        <div className="basis-full lg:basis-0"></div>

        {topics.map((topic, index) => (
          <span key={`${topic}Anchor`}>
            <AnchorLink
              className="mx-4 cursor-pointer hover:text-gray-600 dark:hover:text-gray-400 transition duration-300 ease-in-out"
              href={`#${topic}`}
              offset={window.innerWidth > 1024 ? "10" : "50"}
            >
              {t(topic)}
            </AnchorLink>
            {index === 4 ? null : <span className="font-bold">·</span>}
          </span>
        ))}

        <div className="basis-full lg:basis-0"></div>
        <div className="md:hidden w-1/3 h-px mt-4 bg-pale-black dark:bg-pale-white"></div>
      </div>

      {topics.slice(0, 3).map((topic: string) => {
        let field: string = info![topic as keyof typeof info];
        return (
          <div key={topic}>
            <div className="text-lg lg:text-xl" id={topic}>
              {t(topic)}
            </div>
            {field.split("\n").map((x: string, index: number) => (
              <div className="font-ibm my-2 xl:my-3" key={index}>
                {x}
              </div>
            ))}
          </div>
        );
      })}

      <div className="w-full">
        <div className="text-lg lg:text-xl" id="health">
          {t("health")}
        </div>
        <div className="mt-2 xl:mt-3 font-ibm list-disc">
          {info.health.map((item: string) => (
            <div key={item.slice(0, 3)} className="my-2 xl:my-3 font-ibm">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="text-lg lg:text-xl" id="gallery">
          {t("gallery")}
        </div>

        <div
          className="
          box-border
          gap-2 md:gap-3 2xl:gap-4
          grid rid-cols-1 md:grid-cols-3
          lg:grid-cols-4 2xl:grid-cols-5
          my-2 xl:my-3"
        >
          {images ? (
            images.map((image) => (
              <img
                className="
                  aspect-square w-full
                  object-cover rounded
                  transform hover:scale-105
                  transition duration-200 ease-in-out"
                src={image}
                alt="dogpicture"
                key={image}
              />
            ))
          ) : (
            <div>Couldn't load photos</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="screen">
      <Loader />
    </div>
  );
};

export default memo(DogPage);
