import React, {useEffect, useContext, useState} from 'react'
import "./customer.css";
import database from "../../apis/database";
import Attraction from "../../components/Attraction"
import { Button, CardDeck, Form, Label, Input, FormGroup, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router';
import FormComponent from '../../components/FormComponent';



const ViewAttractions = (props) => {
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await database.post("/v1/customer/attractions");
                setAttractions(response.data);
            } catch (error) {}    
        }
        fetchData();
    }, [])

    const history = useHistory();

    const showsClick = () => {
        history.push("/customer/attractions/shows", {from: "ViewAttractions"});
    };

    const dinosClick = () => {
        history.push("/customer/attractions/dinos", {from: "ViewAttractions"});
    };

    const ridesClick = () => {
        history.push("/customer/attractions/rides", {from: "ViewAttractions"});
    };


    return (
        <div className="customer-container h-100 d-flex justify-content-center">
        <div className="customer-card-container">
        <div className="p-2">
            <Button className="m-2" onClick={showsClick} color="primary" size="lg" block>View Shows</Button>
            <Button className="m-2" onClick={ridesClick} color="secondary" size="lg" block>View Rides</Button>
            <Button className="m-2" onClick={dinosClick} color="primary" size="lg" block>View Dinosaurs</Button>
        </div>
        <CardDeck>
            {attractions.map(attraction => (
                <div key={attraction.aid}>
                <Attraction
                    name={attraction.name}
                    sub={attraction.location}
                />
                </div>
            ))}
        </CardDeck>
        </div>
        </div>
    );         
}

export default ViewAttractions
