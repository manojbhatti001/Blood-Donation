import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Calendar, MapPin, Camera, Check, Clock, 
  AlertCircle, CheckCircle, User, Settings,
  Hospital, Droplet, Edit, Activity, Award, Shield,
  TrendingUp, Users, Gift, Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DonorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Dummy data for Available Blood Requests
  const [availableRequests, setAvailableRequests] = useState([
    {
      requestId: 'REQ001',
      bloodGroup: 'A+',
      requesterName: 'John Doe',
      location: 'Mumbai, Maharashtra',
      status: 'Pending',
      hospitalName: 'City Hospital',
      urgencyLevel: 'High',
      unitsNeeded: 2,
      requestDate: '2024-03-25'
    },
    {
      requestId: 'REQ002',
      bloodGroup: 'O-',
      requesterName: 'Sarah Smith',
      location: 'Delhi, NCR',
      status: 'Pending',
      hospitalName: 'Apollo Hospital',
      urgencyLevel: 'Critical',
      unitsNeeded: 1,
      requestDate: '2024-03-25'
    },
    {
      requestId: 'REQ003',
      bloodGroup: 'B+',
      requesterName: 'Raj Patel',
      location: 'Bangalore, Karnataka',
      status: 'Pending',
      hospitalName: 'Fortis Hospital',
      urgencyLevel: 'Medium',
      unitsNeeded: 3,
      requestDate: '2024-03-24'
    }
  ]);

  // Dummy data for Accepted Requests
  const [acceptedRequests, setAcceptedRequests] = useState([
    {
      requestId: 'ACC001',
      bloodGroup: 'AB+',
      requesterName: 'Priya Singh',
      location: 'Chennai, Tamil Nadu',
      status: 'In Progress',
      hospitalName: 'Global Hospital',
      acceptedDate: '2024-03-23',
      donationDate: '2024-03-26',
      contactNumber: '+91 9876543210'
    },
    {
      requestId: 'ACC002',
      bloodGroup: 'O+',
      requesterName: 'Mike Johnson',
      location: 'Pune, Maharashtra',
      status: 'Scheduled',
      hospitalName: 'Ruby Hall Clinic',
      acceptedDate: '2024-03-24',
      donationDate: '2024-03-27',
      contactNumber: '+91 9876543211'
    }
  ]);

  // Dummy data for Donation History
  const [donationHistory, setDonationHistory] = useState([
    {
      donationId: 'DON001',
      date: '2024-02-15',
      recipientName: 'Amit Kumar',
      hospitalName: 'Max Hospital',
      bloodGroup: 'A+',
      status: 'Completed',
      certificate: 'Available'
    },
    {
      donationId: 'DON002',
      date: '2024-01-20',
      recipientName: 'Lisa Chen',
      hospitalName: 'Medanta Hospital',
      bloodGroup: 'B-',
      status: 'Completed',
      certificate: 'Available'
    },
    {
      donationId: 'DON003',
      date: '2023-12-10',
      recipientName: 'David Wilson',
      hospitalName: 'Apollo Hospital',
      bloodGroup: 'O+',
      status: 'Completed',
      certificate: 'Available'
    }
  ]);

  // Dummy data for Profile
  const [profileData, setProfileData] = useState({
    fullName: 'Alex Johnson',
    bloodGroup: 'O+',
    age: '28',
    gender: 'Male',
    email: 'alex.johnson@email.com',
    phone: '+91 9876543212',
    address: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    lastDonation: '2024-02-15',
    totalDonations: '5',
    isActive: true,
    emergencyContact: '+91 9876543213',
    medicalConditions: 'None'
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleRequestSelection = (request) => {
    setSelectedRequest(request);
    // Additional handling logic
  };

  // Render the appropriate content based on the current route
  const renderContent = () => {
    const currentSection = getCurrentSection();

    switch (currentSection) {
      case 'overview':
        return renderOverview();
      case 'available':
        return renderAvailableRequests();
      case 'accepted':
        return renderAcceptedRequests();
      case 'history':
        return renderDonationHistory();
      case 'profile':
        return renderProfile();
      default:
        return renderOverview();
    }
  };

  const handleAcceptRequest = (request) => {
    setSelectedRequest(request);
    setShowOtpModal(true);
  };

  const handleOtpSubmit = () => {
    if (otp === '123456') { // Replace with actual OTP verification
      setShowOtpModal(false);
      setShowCameraModal(true);
      // Update request status
      const updatedRequests = availableRequests.map(req =>
        req.requestId === selectedRequest.requestId
          ? { ...req, status: 'In Progress' }
          : req
      );
      setAvailableRequests(updatedRequests);
    } else {
      alert('Invalid OTP');
    }
  };

  const handlePhotoSubmit = () => {
    setShowCameraModal(false);
    // Update request status and move to accepted requests
    const newAcceptedRequest = {
      ...selectedRequest,
      status: 'In Progress'
    };
    setAcceptedRequests([...acceptedRequests, newAcceptedRequest]);
  };

  const handleProfileUpdate = () => {
    // Update profile logic here
    setIsEditing(false);
  };

  const renderAvailableRequests = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Available Blood Requests</h2>
        <div className="flex gap-2">
          <select className="px-4 py-2 border rounded-lg text-gray-600 text-sm">
            <option value="">All Blood Types</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-gray-600 text-sm">
            <option value="">All Urgency Levels</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Request Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRequests.map((request) => (
          <motion.div
            key={request.requestId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Card Header */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
                    <Droplet className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <span className="block text-lg font-semibold text-gray-900">
                      {request.bloodGroup}
                    </span>
                    <span className="text-sm text-gray-500">
                      {request.unitsNeeded} units needed
                    </span>
                  </div>
                </div>
                <span 
                  className={
                    `px-3 py-1 rounded-full text-sm font-medium ${
                      request.urgencyLevel === 'Critical' 
                        ? 'bg-red-100 text-red-800' 
                        : request.urgencyLevel === 'High' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`
                  }
                >
                  {request.urgencyLevel}
                </span>
              </div>

              {/* Request Details */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Hospital className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">{request.hospitalName}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">{request.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">{request.requesterName}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">{request.requestDate}</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => handleAcceptRequest(request)}
                className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 
                  transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <Heart className="w-4 h-4" />
                <span>Accept Request</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {availableRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="mx-auto h-24 w-24 text-gray-400">
            <AlertCircle className="h-full w-full" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No Requests Available</h3>
          <p className="mt-2 text-sm text-gray-500">There are currently no blood requests matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );

  const renderAcceptedRequests = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">Accepted Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hospital</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {acceptedRequests.map((request) => (
              <tr key={request.requestId}>
                <td className="px-6 py-4 whitespace-nowrap">{request.requestId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full bg-red-100 text-red-800">
                    {request.bloodGroup}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{request.requesterName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.hospitalName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDonationHistory = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">Donation History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donation ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hospital</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donationHistory.map((donation) => (
              <tr key={donation.donationId}>
                <td className="px-6 py-4 whitespace-nowrap">{donation.donationId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{donation.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{donation.recipientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{donation.hospitalName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{donation.bloodGroup}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {donation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDownloadCertificate(donation)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isEditing ? (
            <>
              <Check className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit className="w-5 h-5" />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => handleProfileChange('fullName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <input
                type="text"
                value={profileData.bloodGroup}
                disabled={true}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
              />
            </div>
            {/* Add more profile fields as needed */}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={profileData.email}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => handleProfileChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={profileData.phone}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onChange={(e) => handleProfileChange('phone', e.target.value)}
              />
            </div>
            {/* Add more contact fields as needed */}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Banner */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 via-red-600 to-red-700"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent)] mix-blend-overlay"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent transform rotate-12"></div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-red-400 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -top-8 -left-8 w-48 h-48 bg-orange-400 rounded-full blur-3xl opacity-30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium text-white">
                  {profileData.bloodGroup} Blood Type
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium text-white">
                  Active Donor
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Welcome back, {profileData.fullName}! 👋
              </h1>
              <p className="text-red-100 text-lg">
                Your next donation eligibility: {profileData.lastDonation}
              </p>
            </div>
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-medium transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  View Profile
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-white px-6 py-3 rounded-xl text-red-600 font-medium hover:text-red-700 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Droplet className="w-5 h-5" />
                  Donate Now
                </span>
                <div className="absolute inset-0 bg-red-50 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Donations",
            value: profileData.totalDonations,
            icon: <Gift className="w-8 h-8" />,
            color: "red",
            detail: `Last donation: ${profileData.lastDonation}`,
            trend: "+12% this month"
          },
          {
            title: "Lives Impacted",
            value: profileData.totalDonations * 3,
            icon: <Users className="w-8 h-8" />,
            color: "purple",
            detail: "Each donation saves 3 lives",
            trend: "Impact growing"
          },
          {
            title: "Donor Status",
            value: "Elite",
            icon: <Star className="w-8 h-8" />,
            color: "amber",
            detail: "Top 10% of donors",
            trend: "Active streak: 6 months"
          },
          {
            title: "Next Milestone",
            value: "5 more",
            icon: <Award className="w-8 h-8" />,
            color: "emerald",
            detail: "Until Gold Status",
            trend: "On track"
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <div className={`bg-${stat.color}-100 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className={`text-4xl font-bold text-gray-900 group-hover:text-${stat.color}-600 transition-colors`}>
                  {stat.value}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className={`w-4 h-4 text-${stat.color}-500`} />
                  <span className="text-gray-600">{stat.trend}</span>
                </div>
                <p className="text-sm text-gray-500">{stat.detail}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Blood Requests</h2>
              <Link 
                to="/available"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                View All
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {availableRequests.slice(0, 3).map((request, index) => (
              <motion.div
                key={request.requestId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                    ${request.urgencyLevel === 'Critical' ? 'bg-red-100' :
                      request.urgencyLevel === 'High' ? 'bg-orange-100' : 'bg-yellow-100'}`}>
                    <Droplet className={`w-6 h-6
                      ${request.urgencyLevel === 'Critical' ? 'text-red-600' :
                        request.urgencyLevel === 'High' ? 'text-orange-600' : 'text-yellow-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {request.requesterName}
                      </p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${request.urgencyLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                          request.urgencyLevel === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {request.urgencyLevel}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Hospital className="w-4 h-4" />
                        {request.hospitalName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {request.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Donation History</h2>
              <Link 
                to="/history"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                View All
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {donationHistory.slice(0, 3).map((donation, index) => (
              <motion.div
                key={donation.donationId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {donation.recipientName}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        Certificate
                      </motion.button>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {donation.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Droplet className="w-4 h-4" />
                        {donation.bloodGroup}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Hospital className="w-4 h-4" />
                        {donation.hospitalName}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Helper functions
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    // Add your logic to show details modal or navigate to details page
  };

  const handleDownloadCertificate = (donation) => {
    // Add your logic to download certificate
    console.log('Downloading certificate for donation:', donation.donationId);
  };

  const handleProfileChange = (key, value) => {
    setProfileData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Get current section and render content
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'overview';
    if (path.includes('/dashboard/available')) return 'available';
    if (path.includes('/dashboard/accepted')) return 'accepted';
    if (path.includes('/dashboard/history')) return 'history';
    if (path.includes('/dashboard/profile')) return 'profile';
    return 'overview';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default DonorDashboard;