import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import Table from "../../../common-components/table/table";
import "./customer.css";

const Customer = () => {
  const history = useHistory();
  const columnsAll = [
    { title: "Customer ID", dataIndex: "cid" },
    { title: "First Name", dataIndex: "fname" },
    { title: "Last Name", dataIndex: "lname" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Code", dataIndex: "code" },
    { title: "Ticket ID", dataIndex: "tid" },
    { title: "Price", dataIndex: "actual_price" },
    { title: "Expiry Date", dataIndex: "expiry_date" },
    { title: "Date Issued", dataIndex: "date_issued" },
    { title: "Family Rep", dataIndex: "family_representative" },
  ];

  let initial = columnsAll.map((val) => [1, 1]);

  const [buttons, setButtons] = useState(initial);

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

  console.log(columns);
  const handleSelection = (idx) => {
    let update = [...buttons];
    update[idx][0] = (update[idx][0] + 1) % 4;
    setButtons(update);
  };

  const handleOrder = (idx) => {
    let update = [...buttons];
    let x = update[idx][1] % 11;
    x += 1;
    update[idx][1] = x;
    setButtons(update);
  };

  const buttonsArray = buttons.map((val, idx) => {
    let className = null;
    className = "selected-button";
    return (
      <div className={className}>
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

  let stuffToDisplay = { selection: display, orderBy: order };

  return (
    <div className="customer-container">
      <div className="customer-banner-container">
        <Button className="backButton" onClick={history.goBack}>
          <span>{"<"}</span>
        </Button>
        <header className="customer-banner">Customer Table</header>
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
        <div className="view-customer-container">
          <div className="white-space">
            <Table
              call={"/customer"}
              columns={columns}
              selector={true}
              selections={stuffToDisplay}
            />
          </div>
        </div>
      </CSSTransition>
      <div className="space"></div>
    </div>
  );
};

export default Customer;
