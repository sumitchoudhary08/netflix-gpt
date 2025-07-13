import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACK_LOGO } from "../utils/constants";

const GptSearch = () => {
  return (
    <>
      <div className="absolute  -z-10">
        <img
          className="h-screen w-screen object-cover"
          alt="backLogo"
          src={BACK_LOGO}
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
