import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Upload from './dashboard/Upload';
import Charts from './dashboard/Charts';
import ActivityLog from './dashboard/ActivityLog';
import Profile from './dashboard/Profile';
import About from './dashboard/About';
import Contact from './dashboard/Contact';
import Privacy from './dashboard/Privacy';
import Parse from './dashboard/Parse';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/activity-log" element={<ActivityLog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/parse" element={<Parse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
