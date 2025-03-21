import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Calendar, 
  Hospital, 
  Clock, 
  Gift, 
  Award, 
  Share2, 
  TrendingUp,
  Search,
  Droplet,
  SearchX,
  Check,
  User,
  Edit,
  Camera,
  Activity,
  Shield,
  Star,
  Users,
  Lock,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Initialize all state variables first
  const [isEditing, setIsEditing] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Add this state for password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Dummy data states
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
    medicalConditions: 'None',
    profileImage: null
  });

  // Animation variants
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

  // Debug useEffect
  useEffect(() => {
    console.log('Available Requests:', availableRequests);
    console.log('Accepted Requests:', acceptedRequests);
    console.log('Donation History:', donationHistory);
    console.log('Profile Data:', profileData);
    console.log('Selected Request:', selectedRequest);
  }, [availableRequests, acceptedRequests, donationHistory, profileData, selectedRequest]);

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
    return (
      <div className="space-y-6">
        {/* Remove the duplicate header that was here */}
        
        {/* Rest of the dashboard content */}
        {(() => {
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
        })()}
      </div>
    );
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
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available Blood Requests</h2>
            <p className="text-gray-500 mt-1">Find and respond to blood donation requests in your area</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
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
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
              <option value="">All Urgency Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
              <option value="">Distance</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="20">Within 20 km</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRequests.map((request) => (
          <motion.div
            key={request.requestId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Request Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    request.urgencyLevel === 'Critical' ? 'bg-red-100' :
                    request.urgencyLevel === 'High' ? 'bg-orange-100' : 'bg-yellow-100'
                  }`}>
                    <Droplet className={`w-6 h-6 ${
                      request.urgencyLevel === 'Critical' ? 'text-red-600' :
                      request.urgencyLevel === 'High' ? 'text-orange-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.bloodGroup}</h3>
                    <p className="text-sm text-gray-500">{request.unitsNeeded} units needed</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.urgencyLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                  request.urgencyLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.urgencyLevel}
                </span>
              </div>
            </div>

            {/* Request Details */}
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Hospital className="w-4 h-4" />
                  <span className="text-sm">{request.hospitalName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{request.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Requested on {request.requestDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => handleAcceptRequest(request)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Donate Now
                </button>
                <button 
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  onClick={() => {/* Add share functionality */}}
                >
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {availableRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No Requests Found</h3>
          <p className="mt-2 text-sm text-gray-500">There are currently no blood requests matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );

  const renderAcceptedRequests = () => (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Accepted Requests</h2>
            <p className="text-gray-500 mt-1">Track and manage your accepted blood donation requests</p>
          </div>
          
          {/* Status Filter */}
          <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
            <option value="">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {acceptedRequests.map((request) => (
          <motion.div
            key={request.requestId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Status Banner */}
            <div className={`px-6 py-3 ${
              request.status === 'Scheduled' ? 'bg-blue-50' :
              request.status === 'In Progress' ? 'bg-yellow-50' :
              'bg-green-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    request.status === 'Scheduled' ? 'bg-blue-500' :
                    request.status === 'In Progress' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></span>
                  <span className={`text-sm font-medium ${
                    request.status === 'Scheduled' ? 'text-blue-700' :
                    request.status === 'In Progress' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">ID: {request.requestId}</span>
              </div>
            </div>

            {/* Request Content */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Blood Group Icon */}
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Droplet className="w-6 h-6 text-red-600" />
                </div>

                {/* Request Details */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Blood Group {request.bloodGroup}</h3>
                      <p className="text-sm text-gray-500">{request.requesterName}</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-600">Accepted on</p>
                        <p className="font-medium text-gray-900">{request.acceptedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-600">Donation Date</p>
                        <p className="font-medium text-gray-900">{request.donationDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hospital & Location Info */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Hospital className="w-4 h-4" />
                      <span className="text-sm">{request.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{request.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{request.contactNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Hospital
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {acceptedRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No Accepted Requests</h3>
          <p className="mt-2 text-sm text-gray-500">You haven't accepted any blood donation requests yet.</p>
        </motion.div>
      )}
    </div>
  );

  const renderDonationHistory = () => (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Donation History</h2>
            <p className="text-gray-500 mt-1">Track your blood donation journey and impact</p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3">
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
              <option value="">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
              <option value="">All Time</option>
              <option value="last_month">Last Month</option>
              <option value="last_3_months">Last 3 Months</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="last_year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 gap-4">
        {donationHistory.map((donation, index) => (
          <motion.div
            key={donation.donationId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Section - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                      <Gift className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">Donation #{donation.donationId}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {donation.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Recipient: {donation.recipientName}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{donation.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{donation.bloodGroup}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hospital className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{donation.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Certificate {donation.certificate}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[200px] justify-center">
                  {donation.certificate === 'Available' && (
                    <button 
                      onClick={() => handleDownloadCertificate(donation)}
                      className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      Download Certificate
                    </button>
                  )}
                  <button 
                    className="w-full px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {donationHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No Donation History</h3>
          <p className="mt-2 text-sm text-gray-500">Your blood donation history will appear here once you make your first donation.</p>
        </motion.div>
      )}

      {/* Pagination */}
      {donationHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{donationHistory.length}</span> of{" "}
              <span className="font-medium">{donationHistory.length}</span> donations
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Profile Info Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden shrink-0">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-red-500" />
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white">{profileData.fullName}</h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  {profileData.bloodGroup}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  {profileData.totalDonations} donations
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isEditing ? (
                <>
                  <Check className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
            <button
              onClick={() => setShowCameraModal(true)}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span className="sm:inline">Update Photo</span>
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span className="sm:inline">Change Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Personal & Contact Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleProfileChange('fullName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={profileData.age}
                  onChange={(e) => handleProfileChange('age', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={profileData.gender}
                  onChange={(e) => handleProfileChange('gender', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <input
                  type="text"
                  value={profileData.bloodGroup}
                  disabled
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <input
                  type="tel"
                  value={profileData.emergencyContact}
                  onChange={(e) => handleProfileChange('emergencyContact', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => handleProfileChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => handleProfileChange('city', e.target.value)}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={profileData.state}
                    onChange={(e) => handleProfileChange('state', e.target.value)}
                    disabled={!isEditing}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Additional Info */}
        <div className="space-y-6">
          {/* Donation Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-500" />
              Donation Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Donations</span>
                <span className="font-semibold">{profileData.totalDonations}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Last Donation</span>
                <span className="font-semibold">{new Date(profileData.lastDonation).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Account Status</span>
                <span className={`font-semibold ${profileData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {profileData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-500" />
              Medical Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                <textarea
                  value={profileData.medicalConditions}
                  onChange={(e) => handleProfileChange('medicalConditions', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-500" />
              Achievements
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">Regular Donor Badge</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Life Saver - 5 Donations</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">Consistent Donor 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Donations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Donations</p>
              <h3 className="text-2xl font-bold text-gray-900">{profileData.totalDonations}</h3>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12% more than last year</span>
            </div>
          </div>
        </div>

        {/* Lives Impacted */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Lives Impacted</p>
              <h3 className="text-2xl font-bold text-gray-900">{profileData.totalDonations * 3}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-blue-600">
              <Star className="w-4 h-4 mr-1" />
              <span>Each donation helps 3 lives</span>
            </div>
          </div>
        </div>

        {/* Next Eligible Date */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Next Eligible Date</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {new Date(new Date(profileData.lastDonation).setMonth(new Date(profileData.lastDonation).getMonth() + 3)).toLocaleDateString()}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Based on last donation date</span>
            </div>
          </div>
        </div>

        {/* Donation Streak */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <h3 className="text-2xl font-bold text-gray-900">3 months</h3>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-purple-600">
              <Award className="w-4 h-4 mr-1" />
              <span>Consistent donor badge earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {donationHistory.slice(0, 3).map((donation, index) => (
              <div key={donation.donationId} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Donated to {donation.recipientName}</p>
                  <p className="text-xs text-gray-500">at {donation.hospitalName}</p>
                  <p className="text-xs text-gray-500">{new Date(donation.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {donation.bloodGroup}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Search className="w-6 h-6 text-red-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Find Requests</span>
              </div>
            </button>
            <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Share2 className="w-6 h-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Share Profile</span>
              </div>
            </button>
            <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Phone className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Contact Support</span>
              </div>
            </button>
            <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Award className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">View Badges</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Shield className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium">Regular Donor Badge</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium">Life Saver - 5 Donations</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">Consistent Donor 2024</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper functions
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    // Add your logic to show details modal or navigate to details page
  };

  const handleDownloadCertificate = (donation) => {
    // Add your certificate download logic here
    console.log('Downloading certificate for donation:', donation.donationId);
    // Example: trigger download of PDF or image file
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }
      // Add your password change API call here
      toast.success('Password updated successfully');
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Failed to update password');
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 sm:left-[80px] md:left-[280px] right-0 z-30 p-4 sm:px-6 pt-6 bg-gray-50">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white animate-pulse" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Donor Dashboard</h1>
                <p className="text-red-100 text-xs sm:text-sm">Making a difference, one donation at a time</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-3 py-1 sm:px-4 sm:py-2 rounded-lg">
              <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-red-200" />
              <span className="text-white text-sm font-medium">{profileData.bloodGroup}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative mt-[120px] sm:mt-[144px] px-4 sm:px-6 pb-6">
        {renderContent()}
      </div>

      {/* Add this password change modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;