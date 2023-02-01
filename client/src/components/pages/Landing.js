import React from "react";
// links for react bootstrap styling
import "../../styles/Landing.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';

export default function Landing() {
    return (
        <Container>
            <Row className="landing">
                <Col xl={4} sm={8} xs={9} className="landing1">
                    <p className="landingT">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Col>
                <Col xl={6} sm={8} xs={9} className="landing2">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://www.marineinsight.com/wp-content/uploads/2019/08/Cruise-ships-1.png" />
                        <Card.Body>
                            <Card.Title>In the mood to cruise?</Card.Title>
                            <Card.Text>
                                Find your next cruise here!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://www.marineinsight.com/wp-content/uploads/2019/08/Cruise-ships-1.png" />
                        <Card.Body>
                            <Card.Title>In the mood to cruise?</Card.Title>
                            <Card.Text>
                                Find your next cruise here!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}