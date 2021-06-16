import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Welcome from "./routes/Welcome/Welcome";
import ViewTable from "./routes/tableView/ViewTable";
import Eats from "./routes/tableView/eats/eats";
import Employees from "./routes/tableView/employee/employees";
import Customer from "./routes/tableView/customer/customer";
import Attractions from "./routes/attractions/attractions";
import ParkView from "./routes/attractions/parkstuff/parkview";
import Count from "./routes/attractions/parkstuff/count/count";
import Stats from "./routes/attractions/parkstuff/stats/stats";
import MoreStats from "./routes/attractions/parkstuff/moreStats/moreStats";

import EmployeePage from "./routes/Employee/EmployeePage";
import AddShift from "./routes/Employee/AddShift";
import UpdateShift from "./routes/Employee/UpdateShift";
import DeleteShift from "./routes/Employee/DeleteShift";

import "./app.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/view" component={ViewTable} />
        <Route exact path="/eats" component={Eats} />
        <Route exact path="/employees" component={Employees} />
        <Route exact path="/customer" component={Customer} />
        <Route exact path="/attractions" component={Attractions} />
        <Route exact path="/park/view" component={ParkView} />
        <Route exact path="/Report" component={Count} />
        <Route exact path="/shift" component={EmployeePage} />
        <Route exact path="/shift/insert" component={AddShift} />
        <Route exact path="/shift/update" component={UpdateShift} />
        <Route exact path="/shift/delete" component={DeleteShift} />
        <Route exact path="/Stats" component={Stats} />
        <Route exact path="/MoreStats" component={MoreStats} />
      </Switch>
    </Router>
  );
};

export default App;
