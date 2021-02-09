import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePageContainer from "./containers/HomePageContainer";

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePageContainer} />
    </Switch>
  );
};

export default App;
