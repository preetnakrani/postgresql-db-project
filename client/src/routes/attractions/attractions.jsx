import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import "./attractions.css";

const Attractions = () => {
  const history = useHistory();
  const handlePark = () => {
    history.push("/Report");
  };
  return (
    <div className="attractions-container">
      <div className="attractions-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
      </div>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="view-attractions-container">
          <div className="view-viewHolder" onClick={handlePark}>
            Park View
          </div>
        </div>
      </CSSTransition>
      <div className="space"></div>
    </div>
  );
};

export default Attractions;
