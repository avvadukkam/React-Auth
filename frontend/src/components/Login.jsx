import React, {useState} from "react";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import {
  Container,
  LoginBox,
  Logo,
  Title,
  Form,
  Input,
  Button,
  StyledLink,
  Divider,
  SocialButtons,
  SocialButton,
} from '../styles/LoginStyles';

import bgVideo from "../assets/bgvideo.mp4";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/api/users/login', {email, password});
      console.log(response.data)
      localStorage.setItem('token',response.data.token);
      toast.success('Logged in successfully!')
      navigate('/dashboard');
    } catch(error) {
      console.error(error);
      setError(error.response.data.error)
      toast.error('Failed to login. Please check your credentials.')
    }
  };

  console.log('Rendering Login component');


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

  const handleGithubFailure = (error) => {
    console.error(error);
    toast.error('GitHub Sign-In was unsuccessful. Please Try again.')
  }


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
      <LoginBox>
        <Logo src={logo} alt="Logo" />
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
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
          <Button type="submit">Login</Button>
        </Form>
        <Divider> or continue with</Divider>
        <SocialButtons>
          <GoogleLogin
            clientId = '430143177887-r4b87kagfjhv0ofsfoqq29k5k2fpcer1.apps.googleusercontent.com'
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <SocialButton onClick={handleGithubSuccess}>
            <FontAwesomeIcon icon={faGithub} size="2x" />
            Sign in with GitHub
          </SocialButton>
        </SocialButtons>
        <StyledLink to="/register">Doesn&apos;t have an account? Signup</StyledLink>
      </LoginBox>
    </Container>
  );
};

export default Login;
