import React, {useEffect, useContext, useState} from 'react'
import "./customer.css";
import main from "../../apis/main";
import Attraction from "../../components/Attraction"
import { CardDeck } from 'reactstrap';

const ViewRides = (props) => {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await main.get("/v1/customer/attractions/rides");
                setRides(response.data.data.rides);
            } catch (error) {}    
        }
        fetchData();
    }, [])

    return (
        <div className="customer-container h-100 d-flex justify-content-center">
        <div className="customer-card-container">
        <h1 className="fw-bold display-1">Rides</h1>
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
