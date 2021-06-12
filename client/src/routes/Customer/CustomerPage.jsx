import React from 'react'
import { useHistory } from "react-router-dom";
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle,
    Button,
} from "reactstrap";
import "./customer.css";


const CustomerPage = () => {
    const history = useHistory();

    const attractionsClick = () => {
        history.push("/customer/attractions", {from: "CustomerPage"});
    };

    const buyTicketClick = () => {
        history.push("/customer/buy", {from: "CustomerPage"});
    };

    const updateInfoClick = () => {
        history.push("/customer/:id/update", {from: "CustomerPage"});
    };
    
    return (
        <div className="customer-container">
        <div className="customer-card-container h-100 d-flex justify-content-center">
        <div className="card-holder">
            <Card>
            <div>
                <CardBody className="d-flex justify-content-center">
                <div>
                <CardTitle tag="h1">Welcome Customers!</CardTitle>
                    <Button onClick={attractionsClick} color="primary" size="lg" block>View Attractions</Button>
                    <Button onClick={buyTicketClick} color="success" size="lg" block>Buy Tickets</Button>
                    <Button onClick={updateInfoClick} color="info" size="lg" block>Update Profile</Button>
                </div>
                </CardBody>
            </div>
            </Card> 
        </div>
        </div>
        </div>
    )
}

export default CustomerPage
