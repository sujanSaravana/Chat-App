import React, { useEffect, useRef, useState } from "react";
import './Navbar.css';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";


function Bar() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="navbar">
        <Navbar className="navbar" expand="lg" expanded={expanded} bg="black" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/Home">
                <p className="nav-title">Home</p>
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                <p className="nav-title">Products</p>
              </Nav.Link>
              <Nav.Link as={Link} to="/Login">
                <p className="nav-title">Login | Sign up</p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Bar;
