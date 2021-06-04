import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import "./welcome.css";

const Welcome = () => {
  const history = useHistory();

  const employeeClick = () => {
    history.push("/employees");
  };

  const customerClick = () => {
    history.push("/customer");
  };

  const exploreClick = () => {
    history.push("/explore");
  };

  const employeeCard = {
    title: "Employee",
    text: "Click here if you are an employee.",
    click: employeeClick,
    alt: "Employee image place holder",
    img: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Frebeccaskilbeck%2Ffiles%2F2019%2F02%2FMaintianing-Motivation-in-employees-Blog-Graphic-1200x861.jpg",
  };

  const customerCard = {
    title: "Customer",
    text: "Click here if you are a customer.",
    click: customerClick,
    alt: "Customer image place holder",
    img: "https://www.digitalmarketer.com/wp-content/uploads/2018/02/customer-avataar-1.png",
  };

  const exploreCard = {
    title: "Exploer",
    text: "Click here if you want to explore the park.",
    click: exploreClick,
    alt: "Explore image place holder",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d109ce23061557.563311582423a.jpg",
  };

  const cards = [employeeCard, customerCard, exploreCard];

  return (
    <div className="welcome-container">
      <h1 className="welcome-banner">Welcome To The Park!</h1>
      <div className="welcome-card-container">
        {cards.map((val, idx) => (
          <div className="card-holder" key={idx}>
            <Card className="card">
              <CardImg
                className="card-img"
                top
                width="50%"
                src={val.img}
                alt={val.alt}
              />
              <CardBody>
                <CardTitle tag="h5">{val.title}</CardTitle>
                <CardText>{val.text}</CardText>
                <Button onClick={val.click}>Click Here</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
