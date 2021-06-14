import React, { useState, useEffect } from "react";
import main from "../apis/main";
import { Table as Stuff } from "antd";
import exportFromJson from "export-from-json";
import "./table.css";
import "antd/dist/antd.css";

const Table = ({ call, columns, selector, selections, filename }) => {
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

  const handleDownload = () => {
    exportFromJson({ data: data, fileName: filename, exportType: "xls" });
  };

  return (
    <div className="complete">
      <div className="table-container">
        <Stuff columns={columns} dataSource={data} pagination={false} />
      </div>
      <div className="download" onClick={() => handleDownload()}>
        Download!
      </div>
    </div>
  );
};

export default Table;
