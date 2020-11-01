import React, { useState, useEffect } from "react";
import { useContent } from "../hooks";
import { useMoviesState, useMoviesDispatch } from "../contexts/movies";
import urls from "../movieDB";
import BrowseContainer from "../containers/browse";

const Browse = () => {
  const { categories, movies } = useMoviesState();
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    if (!movies.trending) return;
    setRandomMovie(
      movies.trending[Math.floor(Math.random() * movies.trending.length + 1)]
    );
    console.log(randomMovie);
  }, [movies?.trending]);

  // useContent("films", categories?.films, urls.discoverMovies);
  // useContent("series", categories?.series, urls.discoverTVSeries);

  return <BrowseContainer movies={movies} randomMovie={randomMovie} />;
};

export default Browse;
