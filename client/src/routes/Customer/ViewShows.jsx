import React, {useEffect, useContext, useState} from 'react'
import "./customer.css";
import database from "../../apis/database";
import Attraction from "../../components/Attraction"
import { CardDeck } from 'reactstrap';

const ViewShows = (props) => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await database.get("/v1/customer/attractions/shows");
                setShows(response.data.data.shows);
            } catch (error) {}    
        }
        fetchData();
    }, [])


    return (
        <div className="customer-container h-100 d-flex justify-content-center">
        <div className="customer-card-container">
        <h1 className="fw-bold display-1">Shows</h1>
        <CardDeck>
            {shows.map(show => (
                <div key={show.aid}>
                <Attraction
                    name={show.name}
                    sub={show.duration + " hours"}
                />
                </div>
            ))}
        </CardDeck>
        </div>
        </div>
    )
}

export default ViewShows
