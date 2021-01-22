import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function NavbarComp() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          src={process.env.PUBLIC_URL + "/logo512.png"}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
        />
        AllInOne
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
          {currentUser ? (
            <Nav.Link
              onClick={() => {
                logout!();
                history.push("/");
              }}
            >
              Log Out
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login">
              Log In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
