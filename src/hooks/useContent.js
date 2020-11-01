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

const useContent = (mainCategory, categories, url) => {
  const dispatch = useMoviesDispatch();

  useEffect(() => {
    if (!categories) return;

    categories.forEach((category) => {
      let page = 1;
      let fetchURL = url.replace("{page}", page);
      fetchURL = fetchURL.replace("{genre}", category.id);

      fetchData(dispatch, fetchURL, category.name, mainCategory);

      page = 2;
      fetchURL = fetchURL.replace("{page}", page);
      fetchData(dispatch, fetchURL, category.name, mainCategory);
    });
  }, [categories, dispatch, url]);
};

export default useContent;
