import React from "react";
import { Card, List, Avatar, Typography, Timeline, Tabs, Row, Col } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { userMock, eventMock } from "../../Data";
const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const EventDetails = () => {
  const event = eventMock;
  const freeVisitorsCount = event.FreeVisitors.Count > 0;
  const renderParticipantList = (participants) => (
    <List
      itemLayout="horizontal"
      dataSource={participants}
      renderItem={(participant) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={`${participant.user.firstName} ${participant.user.lastName}`}
            description={`Joined: ${new Date(
              participant.joinedTime
            ).toLocaleString()}`}
          />
        </List.Item>
      )}
    />
  );
  return (
    <Row justify="center" style={{ padding: "100px 0 20px 0" }}>
      <Col xs={22} sm={20} md={16} lg={12} xl={10}>
        <Card bordered={true}>
          <Title level={2}>{event.title}</Title>
          <Paragraph>{event.description}</Paragraph>
          <Timeline>
            <Timeline.Item>
              <Text strong>Start Date: </Text>
              {new Date(event.startDate).toLocaleString()}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>End Date: </Text>
              {new Date(event.endDate).toLocaleString()}
            </Timeline.Item>
          </Timeline>
          <Title level={4}>Creator</Title>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={`${event.creator.firstName} ${event.creator.lastName}`}
              description={event.creator.email}
            />
          </List.Item>
        </Card>

        {/* Participants Tabbed Group */}
        <Card bordered={false} style={{ marginTop: "20px" }}>
          <Title level={4}>Invited Participants</Title>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Joined" key="1">
              {renderParticipantList(
                event.ParticipantsToVisit.filter((p) => p.joined)
              )}
            </TabPane>
            <TabPane tab="Skipped" key="2">
              {renderParticipantList(
                event.ParticipantsToVisit.filter((p) => !p.joined)
              )}
            </TabPane>
          </Tabs>
        </Card>

        {/* {freeVisitorsCount ?  ( */}
        <Card bordered={false} style={{ marginTop: "20px" }}>
          <Title level={4}>Free Visitors</Title>
          <List
            itemLayout="horizontal"
            dataSource={event.FreeVisitors}
            renderItem={(visitor) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={`${visitor.user.firstName} ${visitor.user.lastName}`}
                  description={`Joined: ${new Date(
                    visitor.joinedTime
                  ).toLocaleString()}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default EventDetails;
