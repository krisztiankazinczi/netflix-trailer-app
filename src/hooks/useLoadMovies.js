import { useEffect, useState } from 'react'
import axios from "../axios";
import { useMoviesState, useMoviesDispatch } from "../contexts/movies";
import urls from '../movieDB';
import selectionMap from "../utils/selectionMap";


async function fetchData(dispatch, fetchUrl, category, mainCategory, setLoading) {
  const request = await axios.get(fetchUrl);
  const mappedNecessaryData = selectionMap(request.data.results);
  dispatch({
    type: "ADD_MOVIES_TO_CATEGORY",
    payload: { mainCategory, category: category, data: mappedNecessaryData },
  });
  setLoading(false);
  return request.data.results;
}

export default function useLoadMovies(mainCategory, category) {
  const { movies, categories } = useMoviesState();
  const dispatch = useMoviesDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let fetchUrl = mainCategory === "films" ? urls.discoverMovies : urls.discoverTVSeries

  const genre = categories[mainCategory].find(catDetails => catDetails.name === category);
  fetchUrl = fetchUrl.replace("{genre}", genre.id);

  const loadNewMoviesInCategory = () => {
    setLoading(true)
    const page = movies[mainCategory][category]?.page + 1
    fetchUrl = fetchUrl.replace("{page}", page);

    fetchData(dispatch, fetchUrl, category, mainCategory, setLoading)

  }
  
  return { loading, error, loadNewMoviesInCategory }

}
