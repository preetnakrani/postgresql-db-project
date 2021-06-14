import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import a from "./apis/main";

import Welcome from "./routes/Welcome/Welcome";
import Tickets from "./routes/Tickets/Tickets"
import EmployeePage from "./routes/Employee/EmployeePage";
import AddShift from "./routes/Employee/AddShift";
import UpdateShift from "./routes/Employee/UpdateShift";
import DeleteShift from "./routes/Employee/DeleteShift";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/tickets" componenet={Tickets}/>
        <Route exact path="/employee" component={EmployeePage}/>
        <Route exact path="/employee/insert" component={AddShift}/>
        <Route exact path="/employee/update" component={UpdateShift}/>
        <Route exact path="/employee/delete" component={DeleteShift}/>
      </Switch>
    </Router>
  );
}

export default App;
