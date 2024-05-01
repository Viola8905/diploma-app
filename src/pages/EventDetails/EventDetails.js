import React from "react";
import { Card, List, Avatar, Typography, Timeline, Tabs, Row, Col } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { convertUtcToLocal } from '../../utils/ConvertUtcToLocal';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const EventDetails = () => {
  const [event, setEvent] = React.useState({});
  const userData = useSelector((state) => state.user);
  let { id, isVisitor } = useParams();

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

  const renderParticipantList = (participants, descrText) => (
    <List
      itemLayout="horizontal"
      dataSource={participants}
      renderItem={(participant) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={`${participant.user.email}`}
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
              {convertUtcToLocal(event.startDate)}
            </Timeline.Item>
            <Timeline.Item>
              <Text strong>End Date: </Text>
              {convertUtcToLocal(event.endDate)}
            </Timeline.Item>
          </Timeline>
          <Title level={4}>Власник</Title>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              // title={`${event?.creator?.firstName} ${event?.creator?.lastName}`}
              title={event?.creator?.email}
            />
          </List.Item>
        </Card>
        {!isVisitor && (
          <>
            <Card bordered={false} style={{ marginTop: "20px" }}>
              <Title level={4}>Запрошені учасники</Title>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Приєдналися" key="1">
                  {renderParticipantList(
                    event?.eventParticipants?.filter((p) => p.joined),
                    "Час приєднання:"
                  )}
                </TabPane>
                <TabPane tab="Пропустили" key="2">
                  {renderParticipantList(
                    event?.eventParticipants?.filter((p) => !p.joined),
                    "Дані відсутні:"
                  )}
                </TabPane>
              </Tabs>
            </Card>
            {/* <Card bordered={false} style={{ marginTop: "20px" }}>
              <Title level={4}>Довільні учасники</Title>
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
            </Card> */}
          </>
        )}
      </Col>
    </Row>
  );
};

export default EventDetails;
