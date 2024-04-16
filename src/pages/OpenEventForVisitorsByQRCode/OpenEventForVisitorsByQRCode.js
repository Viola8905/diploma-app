import React from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Typography, Row, Col, QRCode, Button } from "antd";
import { userMock, eventMock } from "../../Data";
const { Text, Title } = Typography;

// Assuming you have a user object with these properties

const OpenEventForVisitorsByQRCode = () => {
  const userData = useSelector((state) => state.user.user);
  const user = {
    first_name: userData.first_name,
    middle_name: userData.middle_name,
    user_avatar: userData.user_avatar, // Placeholder avatar URL
    userId: userData.userId,
    email: userData.email,
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  return (
    <Row justify="center" style={{ padding: " 100px 10px 0 10px" }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card
          bordered={false}
          style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <h1>Scan This QR Code to Visit this Event</h1>
            <h2>{eventMock.title}</h2>
            <p>Start Date: {eventMock.startDate}</p>
            <p>End Date: {eventMock.endDate}</p>
            <p>Creator: {eventMock.creator.firstName}</p>
            <p>Description: {eventMock.description}</p>
            <div>
              <QRCode
                value={JSON.stringify(eventMock.id)}
                bgColor="#fff"
                style={{
                  margin: "20px  auto",
                }}
              />
            </div>
            <Button type="primary" onClick={downloadQRCode}>
              Download
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default OpenEventForVisitorsByQRCode;
