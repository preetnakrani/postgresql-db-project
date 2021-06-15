import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Welcome from "./routes/Welcome/Welcome";
import CustomerPage from "./routes/Customer/CustomerPage";
import ViewAttractions from "./routes/Customer/ViewAttractions";
import BuyTicket from "./routes/Customer/BuyTicket";
import ViewShows from "./routes/Customer/ViewShows";
import ViewDinos from "./routes/Customer/ViewDinos";
import ViewRides from "./routes/Customer/ViewRides";
import ViewTickets from "./routes/Customer/ViewTickets";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}/>
          <Route exact path="/customer" component={CustomerPage}/>
          <Route exact path="/customer/attractions" component={ViewAttractions}/>
          <Route exact path="/customer/attractions/shows" component={ViewShows}/>
          <Route exact path="/customer/attractions/dinos" component={ViewDinos}/>
          <Route exact path="/customer/attractions/rides" component={ViewRides}/>
          <Route exact path="/customer/buy" component={BuyTicket}/>
          <Route exact path="/customer/view-tickets" component={ViewTickets}/>
      </Switch>
    </Router>
  );
}

export default App;
