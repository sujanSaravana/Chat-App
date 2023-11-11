import React, { useState } from "react";
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useUser } from './Usercontext';

function Bar() {
  const { loggedIn, logout } = useUser();
  const [expanded, setExpanded] = useState(false);

  const handlelogout = () => {
    logout();
    console.log("successfully logged out")
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar className="navbar" expand="lg" expanded={expanded} bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/Chat">
              <p className="nav-title">Chat</p>
            </Nav.Link>
          </Nav>
          <Nav>
            {loggedIn ? (
              <Nav.Link onClick={handlelogout}>
                <p className="nav-title-login">Logout</p>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/Login">
                <p className="nav-title-login">Login | Sign up</p>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Bar;
