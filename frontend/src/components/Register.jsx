import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  RegisterBox,
  Logo,
  Title,
  Form,
  Input,
  Button,
  StyledLink,
  Divider,
  SocialButton,
  SocialButtons,
} from "../styles/RegisterStyles";
import bgVideo from "../assets/bgvideo.mp4";
import logo from "../assets/logo.png";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          fullName,
          email,
          password,
        }
      );
      toast.success("Registered successfully!");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to register. Please try again.");
      console.log(error.response.data);
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log(response);
  };

  const handleGoogleFailure = (error) => {
    console.error(error);
    toast.error('Google Sign-In was unsuccessful. Please try again.')
  };

  const handleGithubSuccess = (response) => {
    console.log(response)
  };

  // const handleGithubFailure = (error) => {
  //   console.error(error);
  //   toast.error('GitHub Sign-In was unsuccessful. Please Try again.')
  // }

  return (
    <Container>
      <ToastContainer />
      <video
        autoPlay
        muted
        loop
        id="bgVideo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <RegisterBox>
        <Logo src={logo} alt="Logo" />
        <Title>Register</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Register</Button>
        </Form>

        <Divider>or Continue with</Divider>
        <SocialButtons>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <SocialButton onClick={handleGithubSuccess}>
            <FontAwesomeIcon icon={faGithub} size="2x" />
            Sign in with GitHub
          </SocialButton>
        </SocialButtons>
        <StyledLink to="/">Already have an account? Login</StyledLink>
      </RegisterBox>
    </Container>
  );
};

export default Register;
