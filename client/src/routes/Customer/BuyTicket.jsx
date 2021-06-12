import React from 'react';
import { Form, Card, CardBody, CardTitle, Button } from 'reactstrap';
import FormComponent from '../../components/FormComponent.jsx';
import "./customer.css";

const BuyTicket = () => {
    return (
        <div className="customer-container">
        <div className="customer-card-container h-100 d-flex justify-content-center">
        <Card>
        <CardTitle className="p-2 text-center" tag="h2">Enter your information to buy a ticket to our park</CardTitle>
        <CardBody>
        <Form>
            <FormComponent 
                label="First Name"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
            />
            <FormComponent 
                label="Last Name"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
            />
            <FormComponent 
                label="Phone Number"
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
            />
            <FormComponent 
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
            />
            <Button size="lg">Submit</Button>
        </Form>
        </CardBody>
        </Card>
        </div>
        </div>
    )
}

export default BuyTicket
