import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import { useRef } from "react";
import openAi from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config?.language);
  const serachText = useRef(null);

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const jsonObj = await data.json();
    return jsonObj.results;
  };

  const handleGptSearchClick = async () => {
    // const gptQuery =
    //   "Act as a movie recommendation and suggest the top 5 movies based the provided text as :" +
    //   serachText;
    // const gptResults = await openAi.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });

    const searchedKeys = serachText.current.value.split(",");

    const promiseList = searchedKeys.map((movie) => searchMovieTmdb(movie));

    const tmdbResult = await Promise.all(promiseList);

    dispatch(
      addGptMoviesResult({ movieNames: searchedKeys, movieResult: tmdbResult })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 p-1 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={serachText}
          type="text"
          className="p-2 m-2 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button
          className="py-2 px-4 m-2 rounded-lg bg-red-500 text-white col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
