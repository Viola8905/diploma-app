import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
  Typography,
  Radio,
  Card,
  message,
} from "antd";

const { Option } = Select;
const { Title } = Typography;

export const CreateEventPage = () => {
  const [form] = Form.useForm();
  const userData = useSelector((state) => state.user);
  const [allUsers, setAllUsers] = React.useState([]);

  const createEvent = async (eventData) => {
    const apiUrl = "https://localhost:7271/api/Events/CreateEvent"; // Replace with your actual API URL

    
    // Construct the POST request body according to your API specification
    const requestBody = {
      title: eventData.eventTitle,
      description: eventData.eventDescription,
      startDate:  new Date(eventData.eventStartDate),
      endDate: new Date(eventData.eventEndDate),
      qrByVisitor: eventData.scanSettings == "qrByParticipants" ? true : false,
      scannerByVisitor:
        eventData.scanSettings == "scannerByParticipants" ? true : false,
      participantIds: eventData.participants,
    };

    try {
      // Making a POST request using Axios
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.user.accessToken}`,
        },
      });

      return response.data.id;
      // Handle response here
    } catch (error) {
      // Handle error here
      alert("Error creating event: ", error.response);
    }
  };

  const getAllUsers = async () => {
    const apiUrl = "https://localhost:7271/api/Users/GetAllUsers"; // Replace with your actual API URL

    // Construct the POST request body according to your API specification

    try {
      // Making a POST request using Axios
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.user.accessToken}`,
        },
      });

      setAllUsers(response.data);
      // Handle response here
    } catch (error) {
      // Handle error here
      alert("Error creating event: ", error.response);
    }
  };

  React.useEffect(() => {
    getAllUsers();
  }, []);

  const onFinish = (values) => {
    createEvent(values);
    message.success("Захід успішно створено!");
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Захід не створився, перевірте поля!");
  };

  return (
    <div>
      <Row justify="center" style={{ padding: "100px 0 20px 0" }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={10}>
          <Card
            bordered={false}
            style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
          >
            <Title
              level={2}
              style={{ textAlign: "center", padding: "0 0 0 0" }}
            >
              Форма для створення Заходу
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="eventTitle"
                label="Заголовок"
                rules={[
                  { required: true, message: "Please input the event Title!" },
                ]}
              >
                <Input placeholder="Enter event Title" />
              </Form.Item>

              <Form.Item
                name="eventDescription"
                label="Опис"
                rules={[
                  {
                    required: true,
                    message: "Please input the event description!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter event description"
                />
              </Form.Item>

              <Form.Item
                name="eventStartDate"
                label="Початок"
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
                label="Кінець"
                rules={[
                  {
                    required: true,
                    message: "Please select the end date and time!",
                  },
                ]}
              >
                <DatePicker showTime use12Hours format="YYYY-MM-DD HH:mm" />
              </Form.Item>

              <Form.Item name="participants" label="Учасники">
                <Select
                  mode="multiple"
                  placeholder="Обрати учасників"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {allUsers.map((x) => (
                    <Option key={x.id} value={x.id}>
                      {x.email}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="scanSettings"
                label="QR Налаштування"
                rules={[
                  { required: true, message: "Please select QR Settings!" },
                ]}
              >
                <Radio.Group>
                  <Radio value="scannerByParticipants">
                    Сканер від Відвідувача
                  </Radio>
                  <Radio value="qrByParticipants">QR від Відвідувача</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Створити
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
