import { useSelector } from "react-redux";
import lang from "../utils/languageConstant";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config?.language);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 p-1 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-2 m-2 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button className="py-2 px-4 m-2 rounded-lg bg-red-500 text-white col-span-3">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
