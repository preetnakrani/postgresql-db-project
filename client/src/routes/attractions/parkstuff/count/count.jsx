import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Table from "../../../../common-components/table/table";
import "./count.css";

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

const Count = () => {
  const history = useHistory();

  const count = [
    {
      disp: "Customers",
      actual: "count(distinct visits.cid) as Number_of_Customers",
      access: "Number_of_Customers",
    },
    {
      disp: "Attractions",
      actual: "count(distinct visits.aid) as Number_of_Attractions",
      access: "Number_of_Attractions",
    },
    {
      disp: "Visits",
      actual: "sum(visits.frequency) as Number_of_Visits",
      access: "Number_of_Visits",
    },
  ];

  const groupBy = [
    {
      disp: "Attraction ID",
      actual: "aid",
      include: "visits.aid as aid",
      g: "visits.aid",
      id: 0,
    },
    {
      disp: "Location",
      actual: "location",
      include: "foo.location as location",
      g: "foo.location",
      id: 1,
    },
    {
      disp: "Customer ID",
      actual: "cid",
      include: "visits.cid as cid",
      g: "visits.cid",
      id: 2,
    },
  ];

  let locations = ["Dinoland", "Rides Galore", "The Stage", "Tech Spot"];

  const [counting, setCounting] = useState(count[0]);
  const [group, setGroup] = useState(groupBy[0]);
  const [cond, setCond] = useState({
    location: "Dinoland",
    active: false,
    val: "",
  });
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState({
    columns,
    stuffToDisplay,
    endpoint: "/join/park",
  });

  const handleGroupChange = (e) => {
    setGroup(groupBy[e.target.value]);
  };

  const boolChange = (e) => {
    setShow(!show);
  };

  const handleCondition = (e) => {
    let temp = { ...cond };
    temp.location = e.target.value;
    setCond(temp);
  };

  const boolChangeCond = (e) => {
    let temp = { ...cond };
    temp.active = !temp.active;
    setCond(temp);
  };
  let groups = (
    <div className="options-container">
      <div className="selection-container">
        <label className="select-label">Group By:</label>
        <select
          className="select-box"
          value={group.id}
          onChange={(e) => handleGroupChange(e)}
        >
          {groupBy.map((val, idx) => {
            return (
              <option value={val.id} className="select-dropdown" key={idx}>
                {val.disp}
              </option>
            );
          })}
        </select>
      </div>
      <div className="check-container">
        <label className="check-label">Group?:</label>
        <input
          type="checkbox"
          className="check-box"
          checked={show}
          onChange={(e) => boolChange(e)}
        />
      </div>
      <div className="selection-container">
        <label className="select-label">Condition:</label>
        <select
          className="select-box"
          value={cond.location}
          onChange={(e) => handleCondition(e)}
        >
          {locations.map((val, idx) => {
            return (
              <option value={val} className="select-dropdown" key={idx}>
                {val}
              </option>
            );
          })}
        </select>
      </div>
      <div className="check-container">
        <label className="check-label">Use Condition:</label>
        <input
          type="checkbox"
          className="check-box"
          checked={cond.active}
          onChange={(e) => boolChangeCond(e)}
        />
      </div>
    </div>
  );

  const handleQuery = (val) => {
    setCounting(val);
  };

  let countButtons = count.map((val, idx) => {
    let className = "query-button";
    if (val.disp === counting.disp) {
      className += "-selected";
    }
    return (
      <div className={className} key={idx} onClick={() => handleQuery(val)}>
        {val.disp}
      </div>
    );
  });

  const performQuery = () => {
    let final = {};
    final.endpoint = "/visit/attractions/park/reports";

    let aggregation = counting.access;
    aggregation = { title: aggregation, dataIndex: aggregation.toLowerCase() };
    let g = { title: group.disp, dataIndex: group.actual.toLowerCase() };
    let tempCol = [];
    tempCol.push(aggregation);
    if (show) {
      tempCol.push(g);
    }
    final.columns = tempCol;

    let tempStuffToDisplay = {};
    let tempSelection = [counting.actual];
    if (show) {
      tempSelection.push(group.include);
    }
    tempStuffToDisplay.selection = tempSelection;

    let tempConditions = {
      column: "Location",
      access: "foo.location",
      currentOperator: "=",
      value: cond.location,
      not: false,
    };
    let tempCondArr = [];
    if (cond.active) {
      tempCondArr.push(tempConditions);
    }
    tempStuffToDisplay.conditions = tempCondArr;

    let tempGroupBy = [];
    if (show) {
      tempGroupBy.push(group.g);
    }
    tempStuffToDisplay.groupBy = tempGroupBy;

    final.stuffToDisplay = tempStuffToDisplay;
    setTab(final);
  };
  return (
    <div className="attractions-container">
      <div className="attractions-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
        <header className="attractions-banner">Report!</header>
      </div>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="query-buttons-container">{countButtons}</div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="selection-stuff-container">{groups}</div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="query-start" onClick={() => performQuery()}>
          Query!
        </div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="view-attractions-container">
          <div>
            <Table
              call={tab.endpoint}
              columns={tab.columns}
              selector={true}
              selections={tab.stuffToDisplay}
              filename="report"
            />
          </div>
        </div>
      </CSSTransition>
      <div className="space"></div>
    </div>
  );
};

export default Count;
