import React from "react";
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
} from "antd";

const { Option } = Select;
const { Title } = Typography;

export const CreateEventPage = () => {
  const [form] = Form.useForm();
  const [eventQrContent, setEventQrContent] = React.useState("");

  const onFinish = (values) => {
    console.log("Received values from form: ", values);
    setEventQrContent(JSON.stringify(values));
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
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={10}>
          <Title
            level={2}
            style={{ textAlign: "center", padding: "100px 0 0 0" }}
          >
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

            <Form.Item
              name="participants"
              label="Participants"
              rules={[
                { required: true, message: "Please select participants!" },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select participants"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {/* Dynamically add <Option> components here based on your data */}
                <Option value="participant1">Participant 1</Option>
                <Option value="participant2">Participant 2</Option>
                {/* Add more options here */}
              </Select>
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
