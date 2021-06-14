import React, {useState} from 'react'
import "./customer.css";
import main from "../../apis/main";
import { Button, Card, CardBody, CardDeck, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import FormComponent from '../../components/FormComponent';

const ViewTickets = () => {
    const [email, setEmail] = useState("");
    const [tier, setTier] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [tickets, setTickets] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await main.post("/v1/customer/view-tickets", {
                tier: tier,
                email: email,
            })
            setSubmit(!submit);
            setTickets(response.data);
        } catch (error) {
        }
    } 

    return (
        <div className="customer-container h-100 d-flex justify-content-center">
        <div className="customer-card-container">
        <Card className="p-4">
            <CardTitle className="text-center" tag="h2">View your tickets</CardTitle>
            <CardBody>
                <Form>
                    <FormComponent
                        state={email}
                        fn={e => setEmail(e.target.value)}
                        label="Email"
                        type="text"
                        name="Email"
                        placeholder="Enter your email"/>
                    <FormGroup className="p-2" check>
                    <Label check>
                        <Input 
                        type="checkbox"
                        onChange={e => setTier(!tier)}
                        />
                        View tier of ticket
                    </Label>
                    </FormGroup>
                <Button onClick={handleSubmit} type="submit">Submit</Button>
                </Form>
            </CardBody>
        </Card>
        <CardDeck>
        {tickets.map(t => (
        <Card key={t.tid}>
            <CardTitle className="p-2 text-center" tag="h2">Purchase details:</CardTitle>
                <CardBody>
                    <p className="card-text fw-bold">{t.fname + " " + t.lname}</p>
                    <p className="card-text"><span className="fw-bold">Phone: </span>{t.phone}</p>
                    <p className="card-text"><span className="fw-bold">Email: </span>{t.email}</p>
                    <p className="card-text"><span className="fw-bold">Price: $</span>{t.actual_price}</p>
                    <p className="card-text"><span className="fw-bold">Expiry date: </span>{t.expiry_date}</p>
                    <p className="card-text"><span className="fw-bold">Date issued: </span>{t.date_issued}</p>
                    {tier ? 
                    <p className="card-text"><span className="fw-bold">Tier: </span>{t.tier}</p> : <p/> }
                </CardBody>
        </Card>
        ))};
        </CardDeck>
        </div>
        </div>
    )
}

export default ViewTickets
