import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import EmergencyBlood from "./Components/EmergencyBlood";
import Volunteer from "./Components/Volunteer";
import Login from "./Components/Login";
import DonorRegistration from "./Components/DonorRegistration";
import Footer from "./Components/Footer";
import { Toaster } from 'react-hot-toast'
import SearchRequests from "./Components/SearchRequests"
import VehicleRegistration from "./Components/VehicleRegistration"
import Register from './Components/Register';
import HospitalRegistration from './Components/HospitalRegistration';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/emergency-blood" element={<EmergencyBlood />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-donor" element={<DonorRegistration />} />
              <Route path="/register-hospital" element={<HospitalRegistration />} />
              <Route path="/search-requests" element={<SearchRequests />} />
              <Route path="/register-vehicle" element={<VehicleRegistration />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}