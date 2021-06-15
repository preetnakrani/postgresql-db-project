import React, {useEffect, useContext, useState} from 'react'
import "./customer.css";
import main from "../../apis/database";
import Attraction from "../../components/Attraction"
import { Card, CardDeck, Form, Row, Col, Label, FormGroup, Input } from 'reactstrap';

const ViewDinos = () => {
    const [dinos, setDinos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await main.get("/v1/customer/attractions/dinos");
                setDinos(response.data.data.dinos);
            } catch (error) {}    
        }
        fetchData();
    }, [])

    return (
        <div className="customer-container h-100 d-flex justify-content-center">
        <div className="customer-card-container">
        <h1 className="fw-bold display-1">Dinos</h1>
        <CardDeck>
            {dinos.map(dino => (
                <div key={dino.aid}>
                <Attraction
                    name={dino.name}
                    sub={"Here, you'll find a " + dino.animal_name}
                />
                </div>
            ))}
        </CardDeck>
        </div>
        </div>
    )
}

export default ViewDinos
