import React from "react";
import { ContentData } from "./NavBar.data";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { logout } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";

const NavBar = () => {
  const { logo } = ContentData;

  const userIsAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the logout action when the button is clicked
    dispatch(logout());
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="light" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <div style={{ width: "50px", height: "50px" }}>
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ height: "100%", width: "100%", borderRadius: "10px" }}
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
            {userIsAuthenticated ? (
              <>
                <Nav.Link href="/create-event">Create Event</Nav.Link>
                <Nav.Link href="/created-events">Created Events</Nav.Link>
                <Nav.Link href="/events-to-visit">Events To Visit</Nav.Link>
                <Nav.Link href="/user-data">
                  <UserOutlined /> {user?.first_name} {user?.middle_name}
                </Nav.Link>
                <Button primary size="large" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <Button primary size="large" href="/login">
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
