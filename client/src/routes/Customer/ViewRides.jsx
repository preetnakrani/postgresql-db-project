import React, {useEffect, useContext, useState} from 'react'
import "./customer.css";
import database from "../../apis/database";
import Attraction from "../../components/Attraction"
import { CardDeck, Col, Form, Input, Label, Row } from 'reactstrap';

const ViewRides = (props) => {
    const [rides, setRides] = useState([]);
    const [selectors, setSelectors] = useState(0);
    const [connector, setConnector] = useState(">");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await database.post("/v1/customer/attractions/rides", {
                    capacity: selectors,
                    connector: connector,
                });
                setRides(response.data);
            } catch (error) {}    
        }
        fetchData();
    }, [selectors, connector]);

    return (
        <div className="customer-container h-100 d-flex justify-content-center">
        <div className="customer-card-container">
        <h1 className="fw-bold display-1">Rides</h1>
        <Form>
        <Row form>
            <Col md={12}>
                <Label for="Rides">Filter for rides with a capacity</Label>
            </Col>
        </Row>
        <Row form>
            <Col md={6}>
                <Input onChange={e => setConnector(e.target.value)} type="select" name="connectorSel">
                    <option>&gt;</option>
                    <option>&lt;</option> 
                    <option>=</option>
                </Input>
            </Col>
            <Col md={6}>
                <Input onChange={e => setSelectors(e.target.value)} type="select" name="select">
                    <option>0</option>
                    <option>10</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                    <option>60</option>
                    <option>70</option>
                </Input>
            </Col>
        </Row>
        </Form>
        <CardDeck>
            {rides.map(ride => (
                <div key={ride.aid}>
                <Attraction
                    name={ride.name}
                    sub={"Capacity: " + ride.capacity + " people"}
                />
                </div>
            ))}
        </CardDeck>
        </div>
        </div>
    )
}

export default ViewRides
