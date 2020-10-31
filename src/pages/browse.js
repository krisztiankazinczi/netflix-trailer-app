import React, { useEffect } from "react";
import { useContent } from "../hooks";
import { useMoviesState, useMoviesDispatch } from "../contexts/movies";
import urls from "../movieDB";

const Browse = () => {
  const { categories } = useMoviesState();
  useContent("films", categories?.films, urls.discoverMovies);
  useContent("series", categories?.series, urls.discoverTVSeries);

  return <div>Browse</div>;
};

export default Browse;
