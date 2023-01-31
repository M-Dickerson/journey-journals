import React from "react";
import "../styles/Navbar.css";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BasicExample({handlePageChange}) {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>M. Dickerson</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#About" onClick={() => handlePageChange("About")}>About</Nav.Link>
            <Nav.Link href="#Contact" onClick={() => handlePageChange("Contact")}>Contact</Nav.Link>
            <Nav.Link href="#Portfolio" onClick={() => handlePageChange("Portfolio")}>Portfolio</Nav.Link>
            <Nav.Link href="#Resume" onClick={() => handlePageChange("Resume")}>Resume</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;