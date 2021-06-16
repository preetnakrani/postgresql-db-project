import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Table from "../../../common-components/table/table";
import "./employees.css";

let globalColumns = [
  { title: "Employee ID", dataIndex: "eid" },
  { title: "First Name", dataIndex: "fname" },
  { title: "Last Name", dataIndex: "lname" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Email", dataIndex: "email" },
  { title: "Salary", dataIndex: "salary" },
  { title: "Shift ID", dataIndex: "sid" },
];
let globalStuffToDisplay = {
  selection: ["eid", "fname", "lname", "phone", "email", "salary", "sid"],
  orderBy: [
    { column: "eid", asc: true },
    { column: "fname", asc: true },
    { column: "lname", asc: true },
    { column: "phone", asc: true },
    { column: "email", asc: true },
    { column: "salary", asc: true },
    { column: "sid", asc: true },
  ],
  conditions: [],
  connectors: [],
  table: "employees",
};
const Employees = () => {
  const history = useHistory();
  const columnsAll = [
    { title: "Employee ID", dataIndex: "eid" },
    { title: "First Name", dataIndex: "fname" },
    { title: "Last Name", dataIndex: "lname" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Salary", dataIndex: "salary" },
    { title: "Shift ID", dataIndex: "sid" },
  ];

  const conditions = [
    {
      column: "Employee ID",
      access: "eid",
      operators: ["=", "<=", ">=", "<", ">", "Between"],
      starterVal: "1",
    },
    {
      column: "First Name",
      access: "fname",
      operators: ["=", "Like"],
      starterVal: "Type here",
    },
    {
      column: "Last Name",
      access: "lname",
      operators: ["=", "Like"],
      starterVal: "Type here",
    },
    {
      column: "Phone",
      access: "phone",
      operators: ["=", "Like"],
      starterVal: "Type here",
    },
    {
      column: "Email",
      access: "email",
      operators: ["=", "Like"],
      starterVal: "Type here",
    },
    {
      column: "Salary",
      access: "salary",
      operators: ["=", "<=", ">=", "<", ">", "Between"],
      starterVal: "1",
    },
    {
      column: "Shift ID",
      access: "sid",
      operators: ["=", "<=", ">=", "<", ">", "Between"],
      starterVal: "1",
    },
  ];

  let initial = columnsAll.map((val) => [1, 1]);

  const [buttons, setButtons] = useState(initial);
  const [usedConditions, setUsedConsitions] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [query, setQuery] = useState(true);

  let columns = columnsAll.reduce((accum, curr, idx) => {
    if (buttons[idx][0] !== 0) {
      return [...accum, curr];
    }
    return accum;
  }, []);

  let display = columns.map((curr, idx) => {
    return curr.dataIndex;
  });

  if (display.length < 1) {
    display = ["*"];
  }

  if (columns.length < 1) {
    columns = [...columnsAll];
  }

  const handleSelection = (idx) => {
    setQuery(false);
    let update = [...buttons];
    update[idx][0] = (update[idx][0] + 1) % 4;
    setButtons(update);
  };

  const handleOrder = (idx) => {
    setQuery(false);
    let update = [...buttons];
    let x = update[idx][1] % 7;
    x += 1;
    update[idx][1] = x;
    setButtons(update);
  };

  const addCondition = (idx) => {
    setQuery(false);
    let cond = [...usedConditions];
    let c = conditions[idx];
    let o = {
      column: c.column,
      access: c.access,
      currentOperator: c.operators[0],
      value: "",
      allOperators: c.operators,
      not: false,
    };
    cond.push(o);
    let j = cond.length;
    let tempCon = [...connectors];
    if (j > 1) {
      tempCon.push("AND");
    }
    setConnectors(tempCon);
    setUsedConsitions(cond);
  };

  const handleConditionChange = (e, idx, prop) => {
    setQuery(false);
    e.preventDefault();
    let cond = [...usedConditions];
    let o = cond[idx];
    o[prop] = e.target.value;
    cond[idx] = o;
    setUsedConsitions(cond);
  };

  const boolChange = (e, idx) => {
    setQuery(false);
    let cond = [...usedConditions];
    let o = cond[idx];
    let newVal = !o.not;
    o["not"] = newVal;
    cond[idx] = o;
    setUsedConsitions(cond);
  };

  const handleDelete = (idx) => {
    setQuery(false);
    let cond = [...usedConditions];
    let con = [...connectors];
    if (idx === 0) {
      con.splice(0, 1);
    } else {
      con.splice(idx - 1, 1);
    }
    setConnectors(con);
    cond.splice(idx, 1);
    setUsedConsitions(cond);
  };

  const handleConnector = (idx) => {
    setQuery(false);
    let con = [...connectors];
    let connect = con[idx];
    if (connect === "AND") {
      connect = "OR";
    } else {
      connect = "AND";
    }
    con[idx] = connect;
    setConnectors(con);
  };

  const buttonsArray = buttons.map((val, idx) => {
    return (
      <div className="selected-button" key={idx}>
        <div className="corner" onClick={() => handleOrder(idx)}>
          {val[1]}
        </div>
        <div className="center" onClick={() => handleSelection(idx)}>
          <h4>{columnsAll[idx].title}</h4>{" "}
          <h5>
            {val[0] === 0 || val[0] === 3
              ? val[0] === 3
                ? "NA"
                : "-"
              : val[0] === 1
              ? "ASC"
              : "DESC"}
          </h5>
        </div>
      </div>
    );
  });

  let conditionsArray = conditions.map((val, idx) => {
    return (
      <div
        onClick={() => {
          addCondition(idx);
        }}
        key={idx}
        className="employees-single-condition"
      >
        <h6>{`+ ${val.column}`}</h6>
      </div>
    );
  });

  let usedConditionsArray = usedConditions.map((val, idx) => {
    return (
      <div className="single-used-condition" key={idx}>
        <div className="cancel" onClick={() => handleDelete(idx)}>
          x
        </div>
        <div className="not-cancel">
          <h6>{val.column}</h6>
          <form className="single-form">
            <div className="check-container">
              <label className="check-label">NOT ?:</label>
              <input
                type="checkbox"
                className="check-box"
                checked={val.not}
                onChange={(e) => boolChange(e, idx)}
              />
            </div>
            <div className="selection-container">
              <label className="select-label">Condition Type:</label>
              <select
                className="select-box"
                value={val.currentOperator}
                onChange={(e) =>
                  handleConditionChange(e, idx, "currentOperator")
                }
              >
                {val.allOperators.map((val, idx) => {
                  return (
                    <option value={val} className="select-dropdown" key={idx}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input-container"></div>
            <label className="input-label">
              Value/Pattern:
              <input
                type="text"
                value={val.value}
                placeholder="Input here"
                onChange={(e) => handleConditionChange(e, idx, "value")}
                className="input-area"
              />
            </label>
          </form>
        </div>
      </div>
    );
  });
  let tempConArray = [];
  for (let k in usedConditionsArray) {
    tempConArray.push(usedConditionsArray[k]);
    if (k < usedConditionsArray.length - 1) {
      let el = (
        <div
          className="connector"
          key={`${k.toString()}hi`}
          onClick={() => handleConnector(k)}
        >
          {connectors[k]}
        </div>
      );
      tempConArray.push(el);
    }
  }

  usedConditionsArray = [...tempConArray];

  let order = [];
  let tempOrder = [...buttons];
  for (let j in tempOrder) {
    tempOrder[j] = [tempOrder[j][0], tempOrder[j][1], j];
  }

  tempOrder.sort((a, b) => {
    if (a[1] < b[1]) {
      return -1;
    }
    if (a[1] > b[1]) {
      return 1;
    }
    return 0;
  });

  tempOrder.filter((val) => {
    if (val[0] === 3) {
      return false;
    }
    return true;
  });

  for (let i in tempOrder) {
    if (tempOrder[i][0] === 1) {
      order.push({ column: columnsAll[tempOrder[i][2]].dataIndex, asc: true });
    } else if (buttons[i][0] === 2) {
      order.push({ column: columnsAll[tempOrder[i][2]].dataIndex, asc: false });
    }
  }

  let stuffToDisplay = {
    selection: display,
    orderBy: order,
    conditions: [...usedConditions],
    connectors: [...connectors],
    table: "employees",
  };

  const handleQuery = () => {
    setQuery(true);
  };

  return (
    <div className="employees-container">
      <div className="employees-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
        <header className="employees-banner">Employees Table</header>
      </div>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="buttons-container">
          {buttonsArray.map((val, idx) => (
            <div className="button-location" key={idx}>
              {" "}
              {val}
            </div>
          ))}
        </div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="employees-condition">{conditionsArray}</div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="employees-used-condition-container">
          {usedConditionsArray}
        </div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="view-employees-query" onClick={() => handleQuery()}>
          Query!
        </div>
      </CSSTransition>
      <CSSTransition in={true} appear={true} timeout={2500} classNames="node">
        <div className="view-employees-container">
          <div>
            <Table
              call={"/allTables"}
              columns={query ? columns : globalColumns}
              selector={true}
              selections={query ? stuffToDisplay : globalStuffToDisplay}
              filename="employees"
            />
          </div>
        </div>
      </CSSTransition>
      <div className="space"></div>
    </div>
  );
};

export default Employees;
