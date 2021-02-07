import { useEffect } from "react";
import axios from "../axios";
import { useMoviesDispatch } from "../contexts/movies";
import selectionMap from "../utils/selectionMap";

async function fetchData(dispatch, fetchUrl, category, mainCategory) {
  const request = await axios.get(fetchUrl);
  const mappedNecessaryData = selectionMap(request.data.results);
  dispatch({
    type: "ADD_MOVIES_TO_CATEGORY",
    payload: { mainCategory, category: category, data: mappedNecessaryData },
  });
  return request.data.results;
}

const useContent = (mainCategory, categories, url, language) => {
  const dispatch = useMoviesDispatch();

  useEffect(() => {
    if (!categories) return;
    
    dispatch({
      type: "LOADING_MOVIES_DATA",
      payload: {
        loading: true
      }
    });

    dispatch({
      type: "DELETE_EVERY_MOVIES"
    });

    const urlsToFetch = [];

    categories.forEach((category, idx) => {

        let page = 1;
        let fetchURL = url.replace("{page}", page);
        fetchURL = fetchURL.replace("{genre}", category.id);
        fetchURL = fetchURL.replace("{lang}", language.value);

        urlsToFetch.push({
          url: fetchURL,
          category: category.name
        });

        // fetchData(dispatch, fetchURL, category.name, mainCategory);

        page = 2;
        fetchURL = url.replace("{page}", page);
        fetchURL = fetchURL.replace("{genre}", category.id);
        fetchURL = fetchURL.replace("{lang}", language.value);

        urlsToFetch.push({
          url: fetchURL,
          category: category.name
        });

        // fetchData(dispatch, fetchURL, category.name, mainCategory);

    });

    Promise.all(urlsToFetch.map( data => fetchData(dispatch, data.url, data.category, mainCategory)))
      .then(done => {
        dispatch({
          type: "LOADING_MOVIES_DATA",
          payload: {
            loading: false
          }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "LOADING_MOVIES_DATA",
          payload: {
            loading: false
          }
        });
      })

  }, [categories, dispatch, url, language, mainCategory]);
};

export default useContent;
