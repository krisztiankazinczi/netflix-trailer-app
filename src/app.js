import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import urls from "./movieDB";
import axios from "./axios";
import { Home, Browse, Signin, Signup } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import { useAuthListener } from "./hooks";

import * as ROUTES from "./constants/routes";

const App = () => {
  const { user } = useAuthListener();

  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await axios.get(urls.discover);
  //     console.log(request.data);
  //   }
  //   fetchData();
  // }, []);

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
