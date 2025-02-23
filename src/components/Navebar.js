import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from 'react-bootstrap/Button';

function Navebar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          TALUKDER AUTO RICE MILL
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              HOME
            </Nav.Link>
            <Nav.Link as={Link} to="/console">
              CONSOLE
            </Nav.Link>
            <NavDropdown title="MORE" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/service">
                SERVICE
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact">
                CONTACT
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Button as={Link} to="/login" style={{ marginRight: "5px" }} variant="primary">
        Login
      </Button>
      <Button as={Link} to="regester" style={{ marginRight: "5px" }} variant="success">Register</Button>
    </Navbar>
  );
}

export default Navebar;
