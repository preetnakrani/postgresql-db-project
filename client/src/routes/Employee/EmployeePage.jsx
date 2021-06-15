import React from 'react'
import { useHistory } from "react-router-dom";
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle,
    Button,
} from "reactstrap";
import "./employee.css";


const EmployeePage = () => {
    const history = useHistory();

    const insertClick = () => {
        history.push("/shift/insert", {from: "EmployeePage"});
    };

    const updateClick = () => {
        history.push("/shift/update", {from: "EmployeePage"});
    };

    const deleteClick = () => {
        history.push("/shift/delete", {from: "EmployeePage"});
    };

    return (
        <div className="employee-container">
        <div className="employee-card-container h-100 d-flex justify-content-center">
        <div className="card-holder">
            <Card>
            <div>
                <CardBody className="d-flex justify-content-center">
                <CardTitle className = "text-center" tag="h1">Make edits to your upcoming shifts here!</CardTitle>
                    <Button className = "m-2" onClick={insertClick} color="primary" size="lg" block>Insert Shift</Button>
                    <Button className = "m-2" onClick={updateClick} color="success" size="lg" block>Update Shift</Button>
                    <Button className = "m-2" onClick={deleteClick} color="info" size="lg" block>Delete Shift</Button>
                </CardBody>
            </div>
            </Card>
        </div>
        </div>
        </div>
    )
}

export default EmployeePage
