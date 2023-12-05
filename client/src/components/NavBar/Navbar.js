import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../NavBar/Navbar.css";

function TopNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar shadow-sm position-sticky top-0">
      <Container>
        <Navbar.Brand className="text-white fw-bold">DASHBOARD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-white"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav >
            <NavLink to="/" className="nav-link" activeClassName="active-link">
              Registration
            </NavLink>
            <NavLink to="/get-registered-data" className="nav-link" activeClassName="active-link">
              Registered Data
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
