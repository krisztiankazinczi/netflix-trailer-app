import React from "react";
import { render } from "react-dom";
import App from "./app";
import { GlobalStyles } from "./styles/global-styles";
import "normalize.css";
// for some reason there is a margin around components, which will disappear with this normalize.css

render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById("root")
);
