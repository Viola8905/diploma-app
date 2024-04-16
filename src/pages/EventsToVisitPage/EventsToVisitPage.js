import React from "react";
import { Row, Col, Card, Button, Typography, Tabs } from "antd";
import { eventsMock } from "../../Data";
import { Link } from "react-router-dom";
import moment from "moment";
const { Title } = Typography;
const { TabPane } = Tabs;

const categorizeEvents = (events) => {
  const upcoming = [];
  const inProgress = [];
  const finished = [];
  const now = moment();

  events.forEach((event) => {
    const start = moment(event.startDate);
    const end = moment(event.endDate);

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
  const { upcoming, inProgress, finished } = categorizeEvents(eventsMock);

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
                <p>Start Date: {item.startDate}</p>
                <p>End Date: {item.endDate}</p>
                <p>Creator: {item.creator.firstName}</p>
                <Link
                  to={
                    item.QRByVisitor
                      ? `/user-data`
                      : `/visit-event-scanner/${item.id}`
                  }
                >
                  <Button
                    type="primary"
                    style={{ margin: "20px 5px 0 0" }}
                    onClick={(e) => e}
                  >
                    Visit Event
                  </Button>
                </Link>
                <Link to={`/event-details/${item.id}`}>
                  <Button
                    type="primary"
                    style={{ marginTop: "20px" }}
                    onClick={(e) => e}
                  >
                    Event Details
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
        Events To Visit Page
      </Title>
      <Tabs defaultActiveKey="1" className="event-tabs">
        <TabPane tab="Upcoming" key="1">
          {renderGroup(upcoming)}
        </TabPane>
        <TabPane tab="In Progress" key="2">
          {renderGroup(inProgress)}
        </TabPane>
        <TabPane tab="Finished" key="3">
          {renderGroup(finished)}
        </TabPane>
      </Tabs>
    </div>
  );
};
