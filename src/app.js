import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import urls from "./movieDB";
import axios from "./axios";
import { Home, Browse, Signin, Signup } from "./pages";

import * as ROUTES from "./constants/routes";

const App = () => {
  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await axios.get(urls.discover);
  //     console.log(request.data);
  //   }
  //   fetchData();
  // }, []);

  return (
    <Router>
      <Route exact path={ROUTES.BROWSE} component={Browse} />
      <Route exact path={ROUTES.SIGN_UP} component={Signup} />
      <Route exact path={ROUTES.SIGN_IN} component={Signin} />
      <Route exact path={ROUTES.HOME} component={Home} />
    </Router>
  );
};

export default App;
