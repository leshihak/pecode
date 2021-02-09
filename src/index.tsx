import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

import { store } from "./store";
import Entrypoint from "./components/Entrypoint";
import reportWebVitals from "./reportWebVitals";

const history = createBrowserHistory({
  basename: "/",
});

ReactDOM.render(
  <React.StrictMode>
    <Entrypoint store={store} history={history} />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
