import React from "react";
import { ContentData } from "./NavBar.data";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "antd";

const NavBar = () => {
  const { logo } = ContentData;

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="light" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <div style={{ width: "50px", height: "50px" }}>
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/" className="justify-content-end">
              About Us
            </Nav.Link>
            <Button danger size="large" href="/login">
              Sign In
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;