import React from "react";
// links for react bootstrap styling
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function About() {
    return (
        <Container className="aboutContainer">
            <Row>
                <Col lg={4}>
                    <img className="aboutImage" alt="me smiling against a yellow background" />
                </Col>
                <Col lg={8}>
                    <h1>About Me</h1>
                    <hr></hr>
                    <p>Hi! My name is Morgan Dickerson and I'm a Full-Stack Web Dev! I used to spend a lot of time editing Tumblr blog themes but I'd never go any further than that out of fear of breaking something. It feels nice not having to worry about that anymore haha! When I'm not coding I'm either creating art or gaming. I've been drawing for roughly 12 years now, give or take, and I mostly do digital art. Fun fact: I actually drew the image to the left!</p>
                    <p>My coding knowledge was very limited before the LPS Coding Bootcamp but thanks to it I'm now all the better! I'm super excited to start this new chapter of my life and start applying the skills I've learned.</p>
                </Col>
            </Row>
        </Container>
    );
}