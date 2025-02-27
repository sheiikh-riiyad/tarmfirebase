import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { auth } from "../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";

function NavbarComponent() {
  const [user, setUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Logout Function
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">TALUKDER AUTO RICE MILL</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            <Nav.Link as={Link} to="/console">CONSOLE</Nav.Link>
            <NavDropdown title="MORE" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/service">SERVICE</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contact">CONTACT</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {user ? (
        <>
          <Button as={Link} to="/regester" style={{ marginRight: "5px" }} variant="success">
            Register
          </Button>
          <Button onClick={handleLogout} variant="danger" style={{ marginRight: "5px" }}>
            Logout
          </Button>
        </>
      ) : (
        <Button as={Link} to="/login" style={{ marginRight: "5px" }} variant="primary">
          Login
        </Button>
      )}
    </Navbar>
  );
}

export default NavbarComponent;
