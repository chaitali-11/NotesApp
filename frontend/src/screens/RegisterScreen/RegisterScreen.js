import { React, useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Register } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";

const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(Register(name, email, password, pic));
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label style={{ fontSize: 18 }}>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              style={{ width: 500 }}
              onChange={(e) => setName(e.target.value)}
              autoComplete="on"
            />
          </Form.Group>
          <br></br>
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
          <Form.Group controlId="confirmPassword">
            <Form.Label style={{ fontSize: 18 }}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              style={{ width: 500 }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col style={{ fontSize: 17 }}>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
