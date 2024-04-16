import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Button,
  Row,
  Col,
  Typography,
  QRCode,
  Radio,
} from "antd";

const { Option } = Select;
const { Title } = Typography;

export const CreateEventPage = () => {
  const [form] = Form.useForm();
  const [eventQrContent, setEventQrContent] = React.useState("");
  const userData = useSelector((state) => state.user);

  const createEvent = async (eventData) => {
    const apiUrl = "https://localhost:7271/api/Events/CreateEvent"; // Replace with your actual API URL

    // Construct the POST request body according to your API specification
    const requestBody = {
      title: eventData.eventTitle,
      description: eventData.eventDescription,
      startDate: "2024-04-16T11:05:38.497Z", //eventData.eventStartDate,
      endDate: "2024-04-16T11:05:38.497Z", // eventData.eventEndDate,
      byVisitor:
        eventData.scanSettings == "scannerByParticipants" ? true : false,
      scannerByVisitor:
        eventData.scanSettings == "qrByParticipants" ? true : false,
      participantIds: ["string"],
    };
    
    try {
      // Making a POST request using Axios
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.user.data.accessToken}`,
        },
      });

      return response.data.id;
      // Handle response here
    } catch (error) {
      // Handle error here
      alert("Error creating event: ", error.response);
    }
  };

  const onFinish = (values) => {
    setEventQrContent(JSON.stringify(createEvent(values)));
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
    <div>
      <Row justify="center" style={{ padding: "100px 0 0 0" }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={10}>
          <Title level={2} style={{ textAlign: "center", padding: "0 0 0 0" }}>
            Create Event Page
          </Title>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="eventTitle"
              label="Event Title"
              rules={[
                { required: true, message: "Please input the event Title!" },
              ]}
            >
              <Input placeholder="Enter event Title" />
            </Form.Item>

            <Form.Item
              name="eventDescription"
              label="Event Description"
              rules={[
                {
                  required: true,
                  message: "Please input the event description!",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter event description" />
            </Form.Item>

            <Form.Item
              name="eventStartDate"
              label="Event Start Date and Time"
              rules={[
                {
                  required: true,
                  message: "Please select the start date and time!",
                },
              ]}
            >
              <DatePicker showTime use12Hours format="YYYY-MM-DD HH:mm" />
            </Form.Item>

            <Form.Item
              name="eventEndDate"
              label="Event End Date and Time"
              rules={[
                {
                  required: true,
                  message: "Please select the end date and time!",
                },
              ]}
            >
              <DatePicker showTime use12Hours format="YYYY-MM-DD HH:mm" />
            </Form.Item>

            <Form.Item name="participants" label="Participants">
              <Select
                mode="multiple"
                placeholder="Select participants"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {/* Dynamically add <Option> components here based on your data */}
                <Option
                  value={JSON.stringify({
                    first_name: userData?.first_name,
                    middle_name: userData?.middle_name,
                    user_avatar: userData?.user_avatar,
                    userId: userData?.userId,
                    email: userData?.email,
                    joinedEvent: false,
                  })}
                >
                  Participant 1
                </Option>
                <Option value="participant2">Participant 2</Option>
                {/* Add more options here */}
              </Select>
            </Form.Item>

            <Form.Item
              name="scanSettings"
              label="QR Scan Settings"
              rules={[
                { required: true, message: "Please select QR Settings!" },
              ]}
            >
              <Radio.Group>
                <Radio value="scannerByParticipants">
                  Scanner on Participants side
                </Radio>
                <Radio value="qrByParticipants">QR on Participants side</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {eventQrContent && (
            <div id="myqrcode" style={{ padding: "20px 0 " }}>
              <Title level={2} style={{ textAlign: "center" }}>
                QR Code for the Event
              </Title>
              <div>
                <QRCode
                  value={eventQrContent}
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
          )}
        </Col>
      </Row>
    </div>
  );
};
