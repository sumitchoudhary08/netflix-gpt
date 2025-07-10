import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACK_LOGO } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute  -z-10">
        <img alt="backLogo" src={BACK_LOGO} />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
