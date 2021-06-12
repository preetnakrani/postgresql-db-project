import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import a from "./apis/main";

import Welcome from "./routes/Welcome/Welcome";
import Tickets from "./routes/Tickets/Tickets"
import CustomerPage from "./routes/Customer/CustomerPage";
import ViewAttractions from "./routes/Customer/ViewAttractions";
import BuyTicket from "./routes/Customer/BuyTicket";
import UpdateCustomerInfo from "./routes/Customer/UpdateCustomerInfo";
import { CustomerContextProvider } from "./context/CustomerContext";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/tickets" componenet={Tickets}/>
        <CustomerContextProvider>
          <Route exact path="/customer" component={CustomerPage}/>
          <Route exact path="/customer/attractions" component={ViewAttractions}/>
          <Route exact path="/customer/buy" component={BuyTicket}/>
          <Route exact path="/customer/:id/update" component={UpdateCustomerInfo}/>
        </CustomerContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
