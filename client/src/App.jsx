import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Welcome from "./routes/Welcome/Welcome";
import Tickets from "./routes/Tickets/Tickets";
import ViewTable from "./routes/tableView/ViewTable";
import Eats from "./routes/tableView/eats/eats";
import Employees from "./routes/tableView/employee/employees";
import Customer from "./routes/tableView/customer/customer";

import "./app.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/tickets" componenet={Tickets} />
        <Route exact path="/view" component={ViewTable} />
        <Route exact path="/eats" component={Eats} />
        <Route exact path="/employees" component={Employees} />
        <Route exact path="/customer" component={Customer} />
      </Switch>
    </Router>
  );
};

export default App;
