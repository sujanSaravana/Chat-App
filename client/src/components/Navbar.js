import React from 'react';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useUser } from './Usercontext';

function Bar() {
  const { loggedIn, logout } = useUser();

  const handlelogout = () => {
    logout();
    console.log("successfully logged out")
  };

  return (
    <div className="navbar">
      <Navbar className="navbar" expand="lg" bg="black" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/Chat">
                <p className="nav-title">Chat</p>
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                <p className="nav-title">Products</p>
              </Nav.Link>
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
    </div>
  );
}

export default Bar;
