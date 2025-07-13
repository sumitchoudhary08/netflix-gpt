import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResult } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white opacity-80">
      <div>
        {movieNames.map((movie, index) => {
          return (
            <MovieList key={index} title={movie} movies={movieResult[index]} />
          );
        })}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
