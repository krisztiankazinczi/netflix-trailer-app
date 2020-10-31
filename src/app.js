import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import urls from "./movieDB";
import axios from "./axios";
import { Home, Browse, Signin, Signup } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { useAuthListener } from "./hooks";
import { useMoviesDispatch } from "./contexts/movies";

import * as ROUTES from "./constants/routes";

async function fetchCategories(mainCategory, url, dispatch) {
  const request = await axios.get(url);
  dispatch({
    type: "GET_CATEGORIES",
    payload: {
      mainCategory,
      data: request.data.genres,
    },
  });
}

const App = () => {
  const { user } = useAuthListener();
  const dispatch = useMoviesDispatch();

  useEffect(() => {
    // fetch movie categories from MovieDB Database
    fetchCategories("films", urls.categories_movie, dispatch);
    fetchCategories("series", urls.categories_series, dispatch);
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_IN}>
          <Signin />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_UP}>
          <Signup />
        </IsUserRedirect>
        <ProtectedRoute user={user} path={ROUTES.BROWSE}>
          <Browse />
        </ProtectedRoute>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.HOME}>
          <Home />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
};

export default App;
