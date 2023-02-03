import React from "react";
// links for react bootstrap styling
import "../../styles/Landing.css";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Landing() {
    return (
        <Container>
            <Row className="landing">
                <Col xl={5} sm={4} xs={9} className="landing1">
                    <p className="landingT">Hi there! Welcome to your destination! </p>
                </Col>
                <Col xl={3} sm={5} xs={7} className="landing2">
                    <Card style={{ width: '25vh' }}>
                        <Card.Img variant="top" src="https://www.marineinsight.com/wp-content/uploads/2019/08/Cruise-ships-1.png" />
                        <Card.Body>
                            <Card.Title>In the mood to cruise?</Card.Title>
                            <Card.Text>
                                Find your next one here!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br></br>
                    <Card style={{ width: '25vh' }}>
                        <Card.Img variant="top" src="https://wallpaperaccess.com/full/2152627.jpg" />
                        <Card.Body>
                            <Card.Title>Can't take the heat?</Card.Title>
                            <Card.Text>
                                Find a nice cabin to chill in here!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}