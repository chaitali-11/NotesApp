import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [history, userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Notes App</h1>
              <p className="subtitle"> One Safe Place for All Notes.</p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
