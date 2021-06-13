import React, { useState, useEffect } from "react";
import database from "../../apis/database";
import { Table as Stuff } from "antd";
import "./table.css";
import "antd/dist/antd.css";

const Table = ({ call, columns }) => {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        let result = await database.get(call);
        console.log(result.data);
        setData(result.data);
      } catch (err) {
        alert(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <Stuff columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default Table;
