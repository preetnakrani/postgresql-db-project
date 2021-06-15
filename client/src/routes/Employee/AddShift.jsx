import React, { useState } from "react";
import { Form, Card, CardBody, CardTitle, Button } from "reactstrap";
import FormComponent from "../../components/FormComponent.jsx";
import "./employee.css";
import database from "../../apis/database";

const AddShift = () => {
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [status, setStatus] = useState("");
  const [eid, setEid] = useState("");
  const [aid, setAid] = useState("");
  const [shiftDetails, setShiftDetails] = useState({});
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await database.post("/v1/employee/add", {
        description: description,
        start_date: start_date,
        end_date: end_date,
        start_time: start_time,
        end_time: end_time,
        status: status,
        eid: eid,
        aid: aid,
      });
      console.log(response);
      setShiftDetails(response.data.data.ticket);
      setSubmit(true);
    } catch (error) {}
  };

  return (
    <div className="employee-container">
      <div className="employee-card-container h-100 d-flex justify-content-center">
        {submit ? (
          <Card>
            <CardTitle className="p-2 text-center" tag="h2">
              Shift details:
            </CardTitle>
            <CardBody>
              <p className="card-text">
                <span className="fw-bold">Employee ID: </span>
                {shiftDetails.eid}
              </p>
              <p className="card-text">
                <span className="fw-bold">Description: </span>
                {shiftDetails.description}
              </p>
              <p className="card-text">
                <span className="fw-bold">Attraction: $</span>
                {shiftDetails.aid}
              </p>
              <p className="card-text">
                <span className="fw-bold">Start Date: </span>
                {shiftDetails.start_date}
              </p>
              <p className="card-text">
                <span className="fw-bold">End Date: </span>
                {shiftDetails.end_date}
              </p>
              <p className="card-text">
                <span className="fw-bold">Start Time: </span>
                {shiftDetails.start_time}
              </p>
              <p className="card-text">
                <span className="fw-bold">End Time: </span>
                {shiftDetails.end_time}
              </p>
              <p className="card-text">
                <span className="fw-bold">Status: </span>
                {shiftDetails.status}
              </p>
            </CardBody>
          </Card>
        ) : (
          <Card className="p-3">
            <CardTitle className="text-center" tag="h2">
              Enter the necessary details to add a shift to an employee.
            </CardTitle>
            <CardBody>
              <Form>
                <FormComponent
                  state={description}
                  fn={(e) => setDescription(e.target.value)}
                  label="Description"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                />
                <FormComponent
                  state={start_date}
                  fn={(e) => setStartDate(e.target.value)}
                  label="Start Date"
                  type="text"
                  name="start_date"
                  id="start_date"
                  placeholder="Start Date"
                />
                <FormComponent
                  state={end_date}
                  fn={(e) => setEndDate(e.target.value)}
                  label="End Date"
                  type="text"
                  name="end_date"
                  id="end_date"
                  placeholder="End Date"
                />
                <FormComponent
                  state={start_time}
                  fn={(e) => setStartTime(e.target.value)}
                  label="Start Time"
                  type="text"
                  name="start_time"
                  id="start_time"
                  placeholder="Start Time"
                />
                <FormComponent
                  state={end_time}
                  fn={(e) => setEndTime(e.target.value)}
                  label="End Time"
                  type="text"
                  name="end_time"
                  id="end_time"
                  placeholder="End Time"
                />
                <FormComponent
                  state={status}
                  fn={(e) => setStatus(e.target.value)}
                  label="Status"
                  type="text"
                  name="status"
                  id="status"
                  placeholder="Status"
                />
                <FormComponent
                  state={eid}
                  fn={(e) => setEid(e.target.value)}
                  label="Employee ID"
                  type="text"
                  name="eid"
                  id="eid"
                  placeholder="Employee ID"
                />
                <FormComponent
                  state={aid}
                  fn={(e) => setAid(e.target.value)}
                  label="Attraction ID"
                  type="text"
                  name="aid"
                  id="aid"
                  placeholder="Attraction ID"
                />
                <Button onClick={handleSubmit} type="submit" size="lg">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AddShift;
