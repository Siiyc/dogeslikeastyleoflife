import "assets/styles/loader.css";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-greenish-white dark:bg-dimmed-black">
      <div className="loader w-48 h-48 md:w-60 md:h-60 text-xl md:text-2xl">
        <span className="text-pale-black dark:text-pale-white">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
