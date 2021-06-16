import React from 'react';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, CardImg,
    Button,
} from "reactstrap";
import "../routes/Customer/customer.css";


const Attraction = (props) => {
    return (
    <div>
        <Card className="p-4">
            {/* <CardImg
            className="img-fluid img-thumbnail"
                top
                width="50%"
                src={props.imgsrc}/> */}
            <CardBody>
                <CardTitle tag="h3">{props.name}</CardTitle>
                <CardSubtitle tag="h4" className="mb-2 text-muted">{props.sub}</CardSubtitle>
            </CardBody>
      </Card>
    </div>
    )
}

export default Attraction
