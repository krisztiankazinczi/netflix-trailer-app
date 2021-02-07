import React, { useState, useEffect } from "react";
import { useContent } from "../hooks";
import { useMoviesState } from "../contexts/movies";
import urls from "../movieDB";
import BrowseContainer from "../containers/browse";



const Browse = () => {
  const { categories, movies, loadingMovies } = useMoviesState();
  const [randomMovie, setRandomMovie] = useState(null);
  const [language, setLanguage] = useState({ label: "en", value: "en-US" });


  useEffect(() => {
      if (!movies?.trending) return;
      setRandomMovie(
        movies.trending[Math.floor(Math.random() * movies.trending.length + 1)]
      );
  }, [movies?.trending]);

  useContent("films", categories?.films, urls.discoverMovies, language);
  useContent("series", categories?.series, urls.discoverTVSeries, language);

  return loadingMovies ? (<div>Loading...</div>) : (
      <BrowseContainer 
        movies={movies} 
        loadingMovies={loadingMovies}
        language={language}
        setLanguage={setLanguage}
        randomMovie={randomMovie} 
      />
    )
  
  
};

export default Browse;
