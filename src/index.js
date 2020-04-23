import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//importando a store que criamos
import store from "./store/index";

import App from "./App";

ReactDOM.render(
  //passando nossa store pata app por meio do provider
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
