import React from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <span className="text-white">
              © 2024 Розробка системи трекінгу відвідувань заходів із застосуванням QR кодів. All rights reserved.
            </span>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Footer;