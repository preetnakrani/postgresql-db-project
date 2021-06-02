import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Welcome from "./routes/Welcome/Welcome";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}/>
      </Switch>
    </Router>
  );
}

export default App;
