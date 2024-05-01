import React from "react";
import { Row, Col, Card, Button, Typography, Tabs } from "antd";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { convertUtcToLocal } from "../../utils/ConvertUtcToLocal";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { TabPane } = Tabs;

const categorizeEvents = (events) => {
  const upcoming = [];
  const inProgress = [];
  const finished = [];
  const now = moment();

  events.forEach((event) => {
    const start = convertUtcToLocal(event.startDate);
    const end = convertUtcToLocal(event.endDate);

    if (now.isBefore(start)) {
      upcoming.push(event);
    } else if (now.isBetween(start, end, null, "[]")) {
      inProgress.push(event);
    } else if (now.isAfter(end)) {
      finished.push(event);
    }
  });

  return { upcoming, inProgress, finished };
};

export const CreatedEventsPage = () => {
  const userData = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { upcoming, inProgress, finished } = categorizeEvents(events);

  const GetCreatedEvents = async () => {
    const apiUrl = "https://localhost:7271/api/Events/GetCreatedEvents";
    try {
      // Making a POST request using Axios
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.user.accessToken}`,
        },
      });

      setEvents(response.data); // Assuming the API returns an array of events
      setLoading(false);
      // Handle response here
    } catch (error) {
      setError(error);
      setLoading(false);
      alert(
        `Error fetching events: ${
          error.response ? error.response.data : "Server error"
        }`
      );
    }
  };

  const DeleteEventById = async (eventId) => {
    const apiUrl = `https://localhost:7271/api/Events/DeleteEvent/${eventId}`; // Replace with your actual API URL

    try {
      // Making a POST request using Axios
      const response = await axios.delete(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.user.accessToken}`,
        },
      });

      if (response.status === 200) {
        GetCreatedEvents();
      }

      // Handle response here
    } catch (error) {
      // Handle error here
      alert("Error creating event: ", error.response);
    }
  };

  React.useEffect(() => {
    GetCreatedEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const renderGroup = (group, title) => (
    <>
      <div style={{ padding: "20px 0" }}>
        <h2>{title}</h2>
        <Row gutter={[16, 16]}>
          {group.map((item, index) => (
            <Col key={index} xs={24} sm={24} md={8} lg={8} xl={8}>
              <Card
                title={item.title}
                bordered={false}
                style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
              >
                <p>Start Date: {convertUtcToLocal(item.startDate)}</p>
                <p>End Date: {convertUtcToLocal(item.endDate)}</p>
                <p>Creator: {item.creator.email}</p>
                <Link
                  to={
                    item.qrByVisitor
                      ? `/start-event-by-scanner/${item.id}`
                      : `/start-event-by-qrcode/${item.id}`
                  }
                >
                  <Button
                    style={{
                      margin: "20px 5px 0 0",
                      // backgroundColor: "#90fc99",
                    }}
                    onClick={(e) => e}
                  >
                    Почати
                  </Button>
                </Link>
                <Link to={`/event-details/${item.id}/false`}>
                  <Button
                    type="primary"
                    style={{ margin: "20px  5px 0 0" }}
                    onClick={(e) => e}
                  >
                    Деталі
                  </Button>
                </Link>
                <Button
                  type="primary"
                  onClick={(e) => e}
                  style={{
                    margin: "20px  5px 0 0",
                    backgroundColor: "orange",
                  }}
                >
                  <EditOutlined style={{ fontSize: "22px" }} />
                </Button>
                <Button
                  danger
                  type="primary"
                  style={{ margin: "20px 0 0 0" }}
                  onClick={(e) => DeleteEventById(item.id)}
                >
                  <DeleteOutlined style={{ fontSize: "22px" }} />
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );

  return (
    <div style={{ margin: "100px 50px 0 50px" }}>
      <Title level={2} style={{ textAlign: "center", padding: "0 0 0 20px" }}>
        Створені Заходи
      </Title>
      <Tabs defaultActiveKey="1" className="event-tabs">
        <TabPane tab="Майбутні" key="1">
          {renderGroup(upcoming)}
        </TabPane>
        <TabPane tab="В Прогресі" key="2">
          {renderGroup(inProgress)}
        </TabPane>
        <TabPane tab="Завершені" key="3">
          {renderGroup(finished)}
        </TabPane>
      </Tabs>
    </div>
  );
};
