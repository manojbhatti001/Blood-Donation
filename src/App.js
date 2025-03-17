import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import EmergencyBlood from "./Components/EmergencyBlood";
import Volunteer from "./Components/Volunteer";
import Login from "./Components/Login";
import HospitalLogin from "./Components/HospitalLogin";
import DonorRegistration from "./Components/DonorRegistration";
import Footer from "./Components/Footer";
import { Toaster } from 'react-hot-toast';
import SearchRequests from "./Components/SearchRequests";
import VehicleRegistration from "./Components/VehicleRegistration";
import Register from './Components/Register';
import HospitalRegistration from './Components/HospitalRegistration';
import BloodRegistration from './Components/BloodRegistration';
import DonorDashboard from "./Components/DonorDashboard";
import RequesterDashboard from "./Components/RequesterDashboard";
import DashboardLayout from './Components/DashboardLayout';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
          <Route path="/emergency-blood" element={<><Navbar /><EmergencyBlood /><Footer /></>} />
          <Route path="/volunteer" element={<><Navbar /><Volunteer /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
          <Route path="/hospital-login" element={<><Navbar /><HospitalLogin /><Footer /></>} />
          <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
          <Route path="/register-donor" element={<><Navbar /><DonorRegistration /><Footer /></>} />
          <Route path="/register-hospital" element={<><Navbar /><HospitalRegistration /><Footer /></>} />
          <Route path="/search-requests" element={<><Navbar /><SearchRequests /><Footer /></>} />
          <Route path="/register-vehicle" element={<><Navbar /><VehicleRegistration /><Footer /></>} />
          <Route path="/Blood-registration" element={<><Navbar /><BloodRegistration /><Footer /></>} />

          {/* Dashboard routes */}
          <Route path="/dashboard/*" element={<DashboardLayout><DonorDashboard /></DashboardLayout>} />
          <Route path="/requester-dashboard/*" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
          <Route path="/requester-dashboard/create" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
          <Route path="/requester-dashboard/active" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
          <Route path="/requester-dashboard/history" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
          <Route path="/requester-dashboard/profile" element={<DashboardLayout><RequesterDashboard /></DashboardLayout>} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
} 