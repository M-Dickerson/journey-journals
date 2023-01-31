import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function TravelFeed() {
    return (
        <Container>
            <h2>Travel Feed</h2>
            <Row>
                <Col>
                    <img>Profile Image</img>
                    <span>title</span>
                    <span>Description: </span>
                    <p>***description text***</p>
                </Col>
                <Col>
                    <h3>Day 1</h3>
                    {/* do we want to use glide.js or bootstrap to carousel images? */}
                    <img>Trip Images Here</img>
                </Col>
                <Col>
                    <span>date</span>
                    {/* how are we handling comments and likes? */}
                    <span>Comment/Like</span>
                </Col>
            </Row>
            <Row>
                {/* 3rd party API--recommendations, etc */}
            </Row>
        </Container>
    );
}