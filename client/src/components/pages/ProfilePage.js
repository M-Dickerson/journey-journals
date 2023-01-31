import React from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";


export default function ProfilePage() {
    return (
        <Container>
            <Row>
                <p>Profile Info</p>
                <p>Edit</p>
                {/* profile picure: */}
                <img alt="placeholder"></img>
                <p>Jane Doe</p>
                <p>Bio: I love nature</p>
                <p>Posts: </p>
                <p>Followers: </p>
                <button>Follow Me</button>
            </Row>
            <Row>
                <p>Saved places/places I want to visit:</p>
            </Row>
            <Row>
                <p>Profile Info</p>
                <p>Edit</p>
            </Row>
        </Container>
    );
}