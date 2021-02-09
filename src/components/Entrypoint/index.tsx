import { Store } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "../../App";

interface EntrypointProps {
  store: Store;
  history: any;
}

const Entrypoint: React.FC<EntrypointProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
};

export default Entrypoint;
