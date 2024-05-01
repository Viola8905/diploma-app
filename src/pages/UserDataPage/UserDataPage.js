import React from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Typography, Row, Col, QRCode, Button } from "antd";
const { Text, Title } = Typography;

// Assuming you have a user object with these properties

const UserDataPage = () => {
  const userData = useSelector((state) => state.user.user);

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
    <Row justify="center" style={{ padding: " 100px 10px 20px 10px" }}>
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
            <Avatar size={64} src={userData.avatar} />
            <Title level={4} style={{ marginTop: 16 }}>
              {userData.firstName} {userData.middleName}
            </Title>
            <Text type="secondary">{userData.email}</Text>
          </div>
          <div style={{ marginTop: 16 }}>
            <Text strong>ID користувача:</Text> <Text>{userData.id}</Text>
          </div>
          <div id="myqrcode" style={{ padding: "20px 0 " }}>
            <Title level={2} style={{ textAlign: "center" }}>
              Персональний QR Code
            </Title>
            <div>
              <QRCode
                value={JSON.stringify(userData.id)}
                bgColor="#fff"
                style={{
                  margin: "20px  auto",
                }}
              />
            </div>
            <Button type="primary" onClick={downloadQRCode}>
              Завантажити QR
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default UserDataPage;
