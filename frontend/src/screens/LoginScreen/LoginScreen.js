import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import { login } from "../../actions/userActions";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes"); //whenever data change it goes to mynotes
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ fontSize: 18 }}>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              style={{ width: 500 }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ fontSize: 18 }}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              style={{ width: 500 }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col style={{ fontSize: 17 }}>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
