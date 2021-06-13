import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Table from "../../../common-components/table/table";
import "./eats.css";

const Eats = () => {
  const history = useHistory();
  const columns = [
    { title: "Attraction ID", dataIndex: "aid" },
    { title: "Food ID", dataIndex: "fid" },
  ];

  return (
    <div className="eats-container">
      <div className="eats-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
        <header className="eats-banner">Eats Table</header>
      </div>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="view-eats-container">
          <Table call={"/eats"} columns={columns} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Eats;
