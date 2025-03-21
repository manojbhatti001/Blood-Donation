import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomepageSections/HomePage";
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
import GallerySection from './Components/HomepageSections/GallerySection';

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
          <Route path="/gallery" element={<><Navbar /><GallerySection /><Footer /></>} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
} 