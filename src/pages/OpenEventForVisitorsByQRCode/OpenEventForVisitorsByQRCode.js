import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Row, Col, QRCode, Button } from "antd";
import { convertUtcToLocal } from '../../utils/ConvertUtcToLocal';
import axios from "axios";

// Assuming you have a user object with these properties

const OpenEventForVisitorsByQRCode = () => {
  const [event, setEvent] = useState({});
  const userData = useSelector((state) => state.user);
  let { id } = useParams();

  const GetEventById = async (eventId) => {
    const apiUrl = `https://localhost:7271/api/Events/GetEventById/${eventId}`; // Replace with your actual API URL

    try {
      // Making a POST request using Axios
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.user.accessToken}`,
        },
      });

      setEvent(response.data);
      // Handle response here
    } catch (error) {
      // Handle error here
      alert("Error creating event: ", error.response);
    }
  };

  React.useEffect(() => {
    GetEventById(id);
  }, []);

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
            <h1>Відскануйте QR в своїй аплікації, щоб відвідати:</h1>
            <h2>{event.title}</h2>
            <p>Start Date: {convertUtcToLocal(event.startDate)}</p>
            <p>End Date: {convertUtcToLocal(event.endDate)}</p>
            <p>Creator: {event.creator?.email}</p>
            <p>Description: {event.description}</p>
            <div>
              <QRCode
                value={JSON.stringify(event.id)}
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

export default OpenEventForVisitorsByQRCode;
