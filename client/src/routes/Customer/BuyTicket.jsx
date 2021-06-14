import React, {useState} from 'react';
import { Form, Card, CardBody, CardTitle, Button } from 'reactstrap';
import FormComponent from '../../components/FormComponent.jsx';
import "./customer.css";
import main from "../../apis/main";

const BuyTicket = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [ticketDetails, setTicketDetails] = useState({});

    const [submit, setSubmit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await main.post("/v1/customer/ticket", {
                fname: fname,
                lname: lname,
                phone: phone,
                email: email,

            })
            console.log(response);
            setTicketDetails(response.data.data.ticket);
            setSubmit(true);
        } catch (error) {
        }
    }

    return (
        <div className="customer-container">
        <div className="customer-card-container h-100 d-flex justify-content-center">
        {submit ? (
            <Card>
                <CardTitle className="p-2 text-center" tag="h2">Purchase details:</CardTitle>
                    <CardBody>
                        <p className="card-text fw-bold">{ticketDetails.fname + " " + ticketDetails.lname}</p>
                        <p className="card-text"><span className="fw-bold">Phone: </span>{ticketDetails.phone}</p>
                        <p className="card-text"><span className="fw-bold">Email: </span>{ticketDetails.email}</p>
                        <p className="card-text"><span className="fw-bold">Price: $</span>{ticketDetails.actual_price}</p>
                        <p className="card-text"><span className="fw-bold">Expiry date: </span>{ticketDetails.expiry_date}</p>
                        <p className="card-text"><span className="fw-bold">Date issued: </span>{ticketDetails.date_issued}</p>
                    </CardBody>
            </Card>
        ) : (
            <Card className="p-3">
            <CardTitle className="text-center" tag="h2">Enter your information to buy a ticket to our park</CardTitle>
            <CardBody>
            <Form>
                <FormComponent
                    state={fname}
                    fn={e => setFname(e.target.value)}
                    label="First Name"
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"/>
                <FormComponent
                    state={lname}
                    fn={e => setLname(e.target.value)} 
                    label="Last Name"
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                />
                <FormComponent
                    state={phone}
                    fn={e => setPhone(e.target.value)} 
                    label="Phone Number"
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                />
                <FormComponent
                    state={email}
                    fn={e => setEmail(e.target.value)} 
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                />
                <Button onClick={handleSubmit} type="submit" size="lg">Submit</Button>
            </Form>
            </CardBody>
            </Card>
        )}
        </div>
        </div>
    )
}

export default BuyTicket
