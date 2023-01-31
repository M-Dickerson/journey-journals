import React from "react";
// links for react bootstrap styling
import "../styles/Navbar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BasicExample({ handlePageChange }) {
    return (
        <Navbar>
            <Container className="navCon">
                <Navbar.Brand className="jj">Journey Journals</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#Signup" onClick={() => handlePageChange("Signup")}>Login/Signup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;