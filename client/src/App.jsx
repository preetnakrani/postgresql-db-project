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

import CustomerPage from "./routes/Customer/CustomerPage";
import ViewAttractions from "./routes/Customer/ViewAttractions";
import BuyTicket from "./routes/Customer/BuyTicket";
import ViewShows from "./routes/Customer/ViewShows";
import ViewDinos from "./routes/Customer/ViewDinos";
import ViewRides from "./routes/Customer/ViewRides";
import ViewTickets from "./routes/Customer/ViewTickets";

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
        <Route exact path="/customerPage" component={CustomerPage} />
        <Route exact path="/customer/attractions" component={ViewAttractions} />
        <Route exact path="/customer/attractions/shows" component={ViewShows} />
        <Route exact path="/customer/attractions/dinos" component={ViewDinos} />
        <Route exact path="/customer/attractions/rides" component={ViewRides} />
        <Route exact path="/customer/buy" component={BuyTicket} />
        <Route exact path="/customer/view-tickets" component={ViewTickets} />
      </Switch>
    </Router>
  );
};

export default App;
