import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import database from "../../../../apis/database";
import "./moreStats.css";

const MoreStats = () => {
  const history = useHistory();

  let globalColumns = [
    {
      title: "Customer ID",
      dataIndex: "cid",
      actual: "c.cid",
      idx: 0,
      active: false,
    },
    {
      title: "First Name",
      dataIndex: "fname",
      actual: "c.fname",
      idx: 1,
      active: false,
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      actual: "c.lname",
      idx: 2,
      active: false,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      actual: "c.phone",
      idx: 3,
      active: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      actual: "c.email",
      idx: 4,
      active: false,
    },
    {
      title: "Code",
      dataIndex: "code",
      actual: "c.code",
      idx: 5,
      active: false,
    },
    {
      title: "Ticket ID",
      dataIndex: "tid",
      actual: "c.tid",
      idx: 6,
      active: false,
    },
    {
      title: "Price",
      dataIndex: "actual_price",
      actual: "c.actual_price",
      idx: 7,
      active: false,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry_date",
      actual: "c.expiry_date",
      idx: 8,
      active: false,
    },
    {
      title: "Date Issued",
      dataIndex: "date_issued",
      actual: "c.date_issued",
      idx: 9,
      active: false,
    },
    {
      title: "Family Rep",
      dataIndex: "family_representative",
      actual: "c.family_representative",
      idx: 10,
      active: false,
    },
  ];

  const tableType = [
    { display: "Attractions", actual: "attractions", id: 0 },
    { display: "Rides", actual: "rides", id: 1 },
    { display: "Shows", actual: "shows", id: 2 },
    { display: "Dinosaurs", actual: "dinosaurs", id: 3 },
  ];

  const [columns, setColumns] = useState(globalColumns);
  const [all, setAll] = useState(tableType[0]);

  const addCondition = (idx) => {
    let tempCol = [...columns];
    tempCol[idx].active = !tempCol[idx].active;
    setColumns(tempCol);
  };

  const handleTableChange = (e) => {
    setAll(tableType[e.target.value]);
  };

  let conditionsArray = columns.map((val, idx) => {
    let select = "";
    if (val.active) {
      select = "-selected";
    }
    return (
      <div
        onClick={() => {
          addCondition(idx);
        }}
        key={idx}
        className={`division-single-condition${select}`}
      >
        <h6>{`+ ${val.title}`}</h6>
      </div>
    );
  });

  let dropDown = (
    <div className="division-options-container">
      <div className="selection-container">
        <label className="select-label">Visited All::</label>
        <select
          className="select-box"
          value={all.id}
          onChange={(e) => handleTableChange(e)}
        >
          {tableType.map((val, idx) => {
            return (
              <option value={idx} className="select-dropdown" key={idx}>
                {val.display}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );

  const performQuery = () => {};

  return (
    <div className="attractions-container">
      <div className="attractions-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
        <header className="attractions-banner">
          Customer who Visited all Attractions!
        </header>
      </div>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="division-condition">{conditionsArray}</div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="division-stuff-container">{dropDown}</div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="options-container" onClick={() => performQuery()}>
          Query!
        </div>
      </CSSTransition>
      <div className="space"></div>
    </div>
  );
};

export default MoreStats;
