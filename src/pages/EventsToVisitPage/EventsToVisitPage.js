import React from "react";
import { Row, Col, Card, Button, Typography, Tabs } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { convertUtcToLocal } from "../../utils/ConvertUtcToLocal";
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

export const EventsToVisitPage = () => {
  const userData = useSelector((state) => state.user);
  const [events, setEvents] = React.useState([]);
  const { upcoming, inProgress, finished } = categorizeEvents(events);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GetParticipatedEvents = async () => {
    const apiUrl = "https://localhost:7271/api/Events/GetParticipatedEvents";
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

  React.useEffect(() => {
    GetParticipatedEvents();
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
                      ? `/user-data`
                      : `/visit-event-scanner/${item.id}`
                  }
                >
                  <Button
                    type="primary"
                    style={{ margin: "20px 5px 0 0" }}
                    onClick={(e) => e}
                  >
                    Відвідати
                  </Button>
                </Link>
                <Link to={`/event-details/${item.id}/true`}>
                  <Button style={{ marginTop: "20px" }} onClick={(e) => e}>
                    Деталі
                  </Button>
                </Link>
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
        Запрошення на Заходи
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
