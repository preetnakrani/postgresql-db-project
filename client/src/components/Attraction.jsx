import React, {useEffect, useContext} from 'react';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, CardImg,
    Button,
} from "reactstrap";
import "../routes/Customer/customer.css";
import main from "../apis/main.js";
import {CustomerContext} from "../context/CustomerContext.js";


const Attraction = (props) => {
    // const {customers, setCustomers} = useContext(CustomerContext)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await main.get("/v1/customer/attractions");
    //             setCustomers(response.data.data.attractions);
    //         } catch (err) {
    
    //         }
    //         // return () => {
    //         // }    
    //     };
    //     fetchData();
    // }, []);

    return (
    <div>
        <Card className="p-4">
            <CardImg
            className="img-fluid img-thumbnail"
                top
                width="50%"
                src={props.imgsrc}/>
            <CardBody>
                <CardTitle tag="h3">{props.name}</CardTitle>
                <CardSubtitle tag="h4" className="mb-2 text-muted">{props.location}</CardSubtitle>
            </CardBody>
      </Card>
    </div>
    )
}

export default Attraction
