import React, {useEffect, useContext}from 'react';
import { CardDeck } from 'reactstrap';
import Attraction from '../../components/Attraction';
import "./customer.css";
import main from "../../apis/main.js";
import {CustomerContext} from "../../context/CustomerContext.js";


const ViewAttractions = (props) => {
    const {customers, setCustomers} = useContext(CustomerContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await main.get("/v1/customer/attractions");
                console.log(response.data.data.attractions[0].name);
                setCustomers(response.data.data);
            } catch (err) {
    
            }
            // return () => {
            // }    
        };
        fetchData();
    }, []);

    return (
        <div>
        <h1>{customers.attractions.aid}</h1>
            {/* {customers.map(attraction => {
                <h1>{attraction.name}</h1>
            })} */}
        </div>
        // <div className="welcome-container h-100 d-flex justify-content-center">
        // <div className="welcome-card-container">
        //     <CardDeck>
        //         <Attraction 
        //             imgsrc="https://static.scientificamerican.com/sciam/cache/file/F4D1E37D-EAAE-49F7-83FC95CAA77563B0_source.jpg?w=590&h=800&DA7F2B49-A23B-49FB-AC7A0603EFEAE05E"
        //             name="Velociraptor Enclosure"
        //             location="Dinoland"
        //             />
        //         <Attraction 
        //             imgsrc="https://static.toiimg.com/thumb/78637129/FERRIS.jpg?width=800&height=700"
        //             name="Ferris Wheel"
        //             location="Rides Galore"
        //             />
        //     </CardDeck>
        // </div> 
        // </div>
    )
}

export default ViewAttractions
