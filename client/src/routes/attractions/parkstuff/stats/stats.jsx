import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import database from "../../../../apis/database";
import "./stats.css";

const Stats = () => {
  const history = useHistory();

  const countOrSum = [
    { display: "Unique Visits", actual: "count(*) as data", id: 0 },
    { display: "All Visits", actual: "sum(frequency) as data", id: 1 },
  ];

  const groupBy = [
    { display: "Location", actual: "foo.location", id: 0 },
    { display: "Attraction", actual: "foo.aid", id: 1 },
    { display: "Customer", actual: "visits.cid", id: 2 },
  ];

  const nested = [
    { display: "MAX", actual: "max(x.data) as data", id: 0 },
    { display: "MIN", actual: "min(x.data) as data", id: 1 },
    { display: "AVG", actual: "avg(x.data) as data", id: 2 },
  ];

  const [inner, setInner] = useState(countOrSum[0]);
  const [group, setGroup] = useState(groupBy[0]);
  const [outer, setOuter] = useState(nested[0]);
  const [dispString, setDispString] = useState(
    calcDispString(outer, inner, group)
  );
  const [value, setValue] = useState("No Data");

  useEffect(() => {
    async function selectorQuery(call, selections) {
      try {
        let result = await database.post(call, selections);
        let n = parseFloat(result.data[0].data).toFixed(2);
        setValue(n);
      } catch (err) {
        alert(err);
      }
    }

    let endpoint = "/visit/attractions/park/stats";
    let select = {};
    select.nest = outer.actual;
    select.group = group.actual;
    select.inner = inner.actual;
    selectorQuery(endpoint, select);
  }, [dispString]);

  const handleInner = (val) => {
    setInner(val);
  };
  const handleGroup = (val) => {
    setGroup(val);
  };
  const handleOuter = (val) => {
    setOuter(val);
  };

  let innerButtons = countOrSum.map((val, idx) => {
    let className = "query-button";
    if (val.display === inner.display) {
      className += "-selected";
    }
    return (
      <div className={className} key={idx} onClick={() => handleInner(val)}>
        {val.display}
      </div>
    );
  });

  let outerButtons = nested.map((val, idx) => {
    let className = "query-button";
    if (val.display === outer.display) {
      className += "-selected";
    }
    return (
      <div className={className} key={idx} onClick={() => handleOuter(val)}>
        {val.display}
      </div>
    );
  });

  let groupButtons = groupBy.map((val, idx) => {
    let className = "query-button";
    if (val.display === group.display) {
      className += "-selected";
    }
    return (
      <div className={className} key={idx} onClick={() => handleGroup(val)}>
        {val.display}
      </div>
    );
  });

  const performQuery = () => {
    let str = calcDispString(outer, inner, group);
    setDispString(str);
  };
  return (
    <div className="attractions-container">
      <div className="attractions-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
        <header className="attractions-banner">Stats!</header>
      </div>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="query-buttons-container">{outerButtons}</div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="query-buttons-container">{innerButtons}</div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="query-buttons-container">{groupButtons}</div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="query-start" onClick={() => performQuery()}>
          Query!
        </div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="view-attractions-container">
          <div className="disp-string">{dispString}</div>
          <div className="result">{value}</div>
        </div>
      </CSSTransition>
      <div className="space"></div>
    </div>
  );
};

function calcDispString(outer, inner, group) {
  let nest = "";
  if (outer.display === "MAX") {
    nest = "Maximum";
  } else if (outer.display === "MIN") {
    nest = "Minimum";
  } else {
    nest = "Average";
  }

  let visit = "";
  if (inner.display === "All Visits") {
    visit = "Visits";
  } else {
    visit = "Unique Visits";
  }

  let gr = "";
  if (group.display === "Location") {
    gr = "in a location";
  } else if (group.display === "Attraction") {
    gr = "in an attraction";
  } else {
    gr = "by a customer";
  }

  let final = `${nest} number of ${visit} ${gr}:`;
  return final;
}

export default Stats;
