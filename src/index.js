import React from "react";
import { render } from "react-dom";
import App from "./app";
import { GlobalStyles } from "./styles/global-styles";
import "normalize.css";
// for some reason there is a margin around components, which will disappear with this normalize.css
import { firebase } from "./lib/firebase.prod";
import { FirebaseContext } from "./contexts/firebase";
import { MoviesProvider } from "./contexts/movies";

render(
  <>
    <FirebaseContext.Provider value={{ firebase }}>
      <MoviesProvider>
        <GlobalStyles />
        <App />
      </MoviesProvider>
    </FirebaseContext.Provider>
  </>,
  document.getElementById("root")
);
