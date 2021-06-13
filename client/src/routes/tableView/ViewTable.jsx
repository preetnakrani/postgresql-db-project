import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./viewTable.css";

const ViewTable = () => {
  const tables = [
    "Attractions",
    "Customer",
    "Eats",
    "Employees",
    "Food",
    "Inventory",
    "Offers",
    "Schedules",
    "Shift",
    "Tickets",
    "Visits",
  ];

  const click = tables.map(
    (val) => () => history.push(val.toLocaleLowerCase())
  );

  const history = useHistory();

  return (
    <div className="view-container">
      <div className="view-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
        <header className="view-banner">Click on Table to View!</header>
      </div>
      <div className="view-tables-container">
        {tables.map((val, idx) => (
          <div key={idx} onClick={click[idx]}>
            <CSSTransition
              in={true}
              appear={true}
              timeout={2500}
              classNames="node"
            >
              <div>
                <div className="viewHolder" key={idx}>
                  <h4>{val}</h4>
                </div>
              </div>
            </CSSTransition>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTable;
