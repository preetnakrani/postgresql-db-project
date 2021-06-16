import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Table from "../../../common-components/table/table";
import "./parkview.css";

let stuffToDisplay = {
  selection: [
    "foo.aid",
    "foo.name",
    "foo.location",
    "visits.cid",
    "visits.frequency",
    "foo.animal_name",
    "foo.capacity",
    "foo.sid",
    "foo.duration",
  ],
  orderBy: [],
  conditions: [],
  connectors: [],
  table: "attractions",
  joins: [
    { table: "dinosaurs", join: "full outer join", on: ["aid", "aid"] },
    { table: "rides", join: "full outer join", on: ["aid", "aid"] },
    { table: "shows", join: "full outer join", on: ["aid", "aid"] },
  ],
};

let columns = [
  { title: "Attraction ID", dataIndex: "aid" },
  { title: "Name", dataIndex: "name" },
  { title: "Location", dataIndex: "location" },
  { title: "Customer ID", dataIndex: "cid" },
  { title: "Frequency", dataIndex: "frequency" },
  { title: "Animal Name", dataIndex: "animal_name" },
  { title: "Capacity", dataIndex: "capacity" },
  { title: "Schedule ID", dataIndex: "sid" },
  { title: "Duration", dataIndex: "duration" },
];

const ParkView = () => {
  const history = useHistory();
  const queries = ["Count"];

  const handleQuery = (val) => {
    history.push("/" + val);
  };

  let quneryButtons = queries.map((val, idx) => {
    return (
      <div className="query-button" key={idx} onClick={() => handleQuery(val)}>
        {val}
      </div>
    );
  });
  return (
    <div className="attractions-container">
      <div className="attractions-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
        <header className="attractions-banner">Attraction Reports</header>
      </div>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="query-buttons-container">{quneryButtons}</div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="view-attractions-container">
          <div>
            <Table
              call={"/join/park"}
              columns={columns}
              selector={true}
              selections={stuffToDisplay}
              filename="employees"
            />
          </div>
        </div>
      </CSSTransition>
      <div className="space"></div>
    </div>
  );
};

export default ParkView;
