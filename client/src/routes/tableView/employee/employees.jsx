import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Table from "../../../common-components/table/table";
import "./employees.css";

const Employees = () => {
  const history = useHistory();
  const columns = [
    { title: "Employee ID", dataIndex: "eid" },
    { title: "First Name", dataIndex: "fname" },
    { title: "Last Name", dataIndex: "lname" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Salary", dataIndex: "salary" },
    { title: "Shift ID", dataIndex: "sid" },
  ];

  const [buttons, setButtons] = useState([1, 1, 1, 1, 1, 1, 1]);

  const buttonsArray = buttons.map((val, idx) => {
    let className = null;
    if (val == 0) {
      className = "select-button";
    } else {
      className = "selected-button";
    }
    return (
      <Button className={className}>
        {" "}
        <span>{columns[idx].title}</span>{" "}
        {val != 0 && <span>{val == 1 ? "ASC" : "DESC"}</span>}
      </Button>
    );
  });

  return (
    <div className="eats-container">
      <div className="eats-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
        <header className="eats-banner">Employees Table</header>
      </div>
      <div className="buttons-container">
        {buttonsArray.map((val, idx) => {
          <div> {val}</div>;
        })}
      </div>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="view-eats-container">
          <Table call={"/employees"} columns={columns} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Employees;
