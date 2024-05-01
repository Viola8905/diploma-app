import React from "react";
import { QrReader } from "react-qr-reader";
import { Card, Row, Col, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { convertUtcToLocal } from "../../utils/ConvertUtcToLocal";

export const VisitEventQRScannerPage = () => {
  const [data, setData] = useState("No result");
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

  const UpdateEventParticipant = async (eventId, userId) => {
    const apiUrl = `https://localhost:7271/api/Events/UpdateEventParticipant/${eventId}/${userId}`; // Replace with your actual API URL

    try {
      // Making a POST request using Axios
      const response = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.user.accessToken}`,
          },
        }
      );

      message.success("Ви успішно приєдналися до Заходу");
      // Handle response here
    } catch (error) {
      // Handle error here
      message.error("Щось пішло не так, ви не змогли приєднатися");
      console.log("Error creating event: ", error.response);
    }
  };

  React.useEffect(() => {
    GetEventById(id);
  }, []);

  return (
    <Row justify="center" style={{ padding: " 100px 10px 20px 10px" }}>
      <Col xs={24} sm={12} md={8} lg={12}>
        <Card
          bordered={false}
          style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Відскануйте QR код Заходу, щоб відвідати:</h1>
            <h2>{event.title}</h2>
            <p>Start Date: {convertUtcToLocal(event.startDate)}</p>
            <p>End Date: {convertUtcToLocal(event.endDate)}</p>
            <p>Creator: {event.creator?.email}</p>
            <p>Description: {event.description}</p>
          </div>
          <div style={{}}>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  UpdateEventParticipant(
                    (result?.text).replace(/"/g, ""),
                    userData.user.id
                  );
                  setData(userData.user.id);
                }

                // if (!!error) {
                //   console.info(error);
                // }
              }}
              style={{ width: "100%" }}
            />
            <p>{data}</p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
