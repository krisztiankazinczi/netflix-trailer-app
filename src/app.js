import React, { useEffect } from "react";
import urls from "./movieDB";
import axios from "./axios";
import Home from "./pages/home";

const App = () => {
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(urls.discover);
      console.log(request.data);
    }
    fetchData();
  }, []);

  return <Home />;
};

export default App;
