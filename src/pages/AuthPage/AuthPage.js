import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Radio,
} from "antd";

import { loginUser, registerUser } from "../../store/UserSlice";

const { Title } = Typography;

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const handleLoginEvent = (e) => {
    e.preventDefault();

    let userCredentials = {
      email,
      password,
      first_name:"Vio",
      middle_name:"Pro",
      userId: 2,
      user_avatar: "https://example.com/path-to-avatar.jpg"
    };

    dispatch(loginUser(userCredentials))
      .unwrap()
      .then(() => {
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to login:", error);
        // Handle login failure (e.g., show an error message)
      });
  };

  const handleRegisterEvent = (e) => {
    e.preventDefault();

    let userCredentials = {
      email,
      password,
      first_name,
      middle_name,
      userId: 2,
      user_avatar: "https://example.com/path-to-avatar.jpg"
    };

    dispatch(registerUser(userCredentials))
      .unwrap()
      .then(() => {
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to login:", error);
        // Handle login failure (e.g., show an error message)
      });
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        {/* Adjusted to fill viewport height */}
        <Col xs={24} sm={16} md={12} lg={8} xl={8}>
          {/* Adjust width as needed */}
          <Card>
            <Title level={2} style={{ textAlign: "center" }}>
              {isLogin ? "Log In" : "Sign Up"}
            </Title>
            <Form layout="vertical">
              {isLogin ? (
                <>
                  <Form.Item label="Email">
                    <Input
                      placeholder="Email"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="Password">
                    <Input.Password
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item label="Name">
                    <Input
                      placeholder="Name"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="Surname">
                    <Input
                      placeholder="Surname"
                      value={middle_name}
                      onChange={(e) => setMiddle_name(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input
                      placeholder="Email"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="Password">
                    <Input.Password
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                </>
              )}
            </Form>

            <Row justify="space-between">
              {isLogin ? (
                <Col>
                  Don't have an account?
                  <NavLink to="/registration"> Create one!</NavLink>
                </Col>
              ) : (
                <Col>
                  Already have an account?
                  <NavLink to="/login"> Log In!</NavLink>
                </Col>
              )}

              <Col>
                {isLogin ? (
                  <Button
                    type="primary"
                    style={{ marginTop: "20px" }}
                    onClick={(e) => handleLoginEvent(e)}
                  >
                    {loading ? "Loading..." : "Log In"}
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    style={{ marginTop: "20px" }}
                    onClick={(e) => handleRegisterEvent(e)}
                  >
                    Continue
                  </Button>
                )}
              </Col>
            </Row>
            {error && (
              <div style={{ margin: "20px auto" }}>
                <Alert
                  message="Login Error"
                  description={error}
                  type="error"
                  showIcon
                  closable
                />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AuthPage;
