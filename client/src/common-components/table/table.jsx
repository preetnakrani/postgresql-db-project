import React, { useState, useEffect } from "react";
import database from "../../apis/database";
import { Table as Stuff } from "antd";
import "./table.css";
import "antd/dist/antd.css";

const Table = ({ call, columns, selector, selections }) => {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        let result = await database.get(call);
        setData(result.data);
      } catch (err) {
        alert(err);
      }
    }
    async function selectorQuery() {
      try {
        let result = await database.post(call, selections);
        setData(result.data);
        console.log(result.data);
      } catch (err) {
        alert(err);
      }
    }

    if (selector) {
      selectorQuery();
    } else {
      fetchData();
    }
  }, [selections]);

  return (
    <div className="table-container">
      <Stuff columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default Table;
