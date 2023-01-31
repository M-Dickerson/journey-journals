import React from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function ProfilePage() {
    return (
        <Container>
            <Row>
                <span>Profile Info</span>
                <a>Edit</a>
                {/* profile picure: */}
                <img></img>
                <span>Jane Doe</span>
                <span>Bio: I love nature</span>
                <span>Posts: </span>
                <span>Followers: </span>
                <button>Follow Me</button>
            </Row>
        </Container>
    )
}