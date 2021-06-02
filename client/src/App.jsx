import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import a from "./apis/main";

import Welcome from "./routes/Welcome/Welcome";
import Tickets from "./routes/Tickets/Tickets"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/tickets" componenet={Tickets}/>
      </Switch>
    </Router>
  );
}

export default App;
