import React, { useState } from "react";
import { Form, Card, CardBody, CardTitle, Button } from "reactstrap";
import FormComponent from "../../components/FormComponent.jsx";
import "./employee.css";
import database from "../../apis/database";

const DeleteShift = () => {
  const [description, setDescription] = useState("");
  const [eid, setEid] = useState("");
  const [shiftDetails, setShiftDetails] = useState({});
  const [submit, setSubmit] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await database.post("/v1/employee/delete", {
        description: description,
        eid: eid,
      });
      console.log(response);
      setShiftDetails(response.data[0]);
      setSubmit(true);
    } catch (error) {}
  };

  return (
    <div className="employee-container">
      <div className="employee-card-container h-100 d-flex justify-content-center">
        {submit ? (
          <Card>
            <CardTitle className="p-2 text-center" tag="h2">
              Shift Deleted:
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
            </CardBody>
          </Card>
        ) : (
          <Card className="p-3">
            <CardTitle className="text-center" tag="h2">
              Enter your information to buy a ticket to our park
            </CardTitle>
            <CardBody>
              <Form>
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
                  state={description}
                  fn={(e) => setDescription(e.target.value)}
                  label="Description"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
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

export default DeleteShift;
