import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { GoogleOAuthProvider } from '@react-oauth/google';


const clientId = '430143177887-r4b87kagfjhv0ofsfoqq29k5k2fpcer1.apps.googleusercontent.com'

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );  
};

export default App;
