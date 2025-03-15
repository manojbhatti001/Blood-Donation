import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Hospital, Clock, AlertCircle, CheckCircle, MapPin, 
  Droplet, Users, Plus, X, Edit, Trash, Phone, Mail, 
  User, Activity, Calendar, BarChart, TrendingUp,
  ArrowRight, MoreVertical, Bell, Lock, Building
} from 'lucide-react';

const RequesterDashboard = () => {
  const location = useLocation();
  
  // Dummy data for active requests
  const [activeRequests, setActiveRequests] = useState([
    {
      id: 'REQ001',
      bloodGroup: 'A+',
      hospitalLocation: 'City Hospital, Mumbai',
      urgencyLevel: 'Critical',
      status: 'Pending',
      additionalNotes: 'Urgent requirement for surgery',
      donors: [
        { id: 1, name: 'John Doe', contact: '+91 98765-43210', status: 'Accepted' }
      ],
      createdAt: '2024-03-25'
    },
    {
      id: 'REQ002',
      bloodGroup: 'O-',
      hospitalLocation: 'Apollo Hospital, Delhi',
      urgencyLevel: 'High',
      status: 'In Progress',
      additionalNotes: 'Need for emergency procedure',
      donors: [
        { id: 2, name: 'Jane Smith', contact: '+91 98765-43211', status: 'Accepted' },
        { id: 3, name: 'Mike Johnson', contact: '+91 98765-43212', status: 'Pending' }
      ],
      createdAt: '2024-03-24'
    },
    {
      id: 'REQ003',
      bloodGroup: 'B+',
      hospitalLocation: 'Fortis Hospital, Bangalore',
      urgencyLevel: 'Medium',
      status: 'Pending',
      additionalNotes: 'Regular requirement',
      donors: [],
      createdAt: '2024-03-23'
    }
  ]);

  // Dummy data for request history
  const [requestHistory, setRequestHistory] = useState([
    {
      id: 'HIST001',
      bloodGroup: 'AB+',
      hospitalName: 'Max Hospital',
      status: 'Completed',
      date: '2024-03-15',
      donorCount: 2,
      location: 'Chennai'
    },
    {
      id: 'HIST002',
      bloodGroup: 'O+',
      hospitalName: 'Medanta Hospital',
      status: 'Cancelled',
      date: '2024-03-10',
      donorCount: 0,
      location: 'Gurgaon'
    },
    {
      id: 'HIST003',
      bloodGroup: 'A-',
      hospitalName: 'AIIMS Hospital',
      status: 'Completed',
      date: '2024-03-05',
      donorCount: 1,
      location: 'Delhi'
    }
  ]);

  // Profile data
  const [profile, setProfile] = useState({
    hospitalName: 'City General Hospital',
    email: 'contact@cityhospital.com',
    phone: '+91 98765-43210',
    address: '123 Healthcare Avenue',
    state: 'Maharashtra',
    city: 'Mumbai',
    registrationNumber: 'HOSP123456',
    type: 'Multi-Specialty',
    operatingHours: '24x7',
    emergencyContact: '+91 98765-43213'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    bloodGroup: '',
    units: '',
    urgencyLevel: 'Normal',
    requiredDate: '',
    patientDetails: '',
    additionalNotes: '',
  });

  // Add these statistics
  const [dashboardStats, setDashboardStats] = useState({
    totalRequests: activeRequests.length + requestHistory.length,
    activeRequests: activeRequests.length,
    completedRequests: requestHistory.filter(r => r.status === 'Completed').length,
    totalDonors: activeRequests.reduce((acc, req) => acc + req.donors.length, 0)
  });

  // Get current section based on URL
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.includes('/create')) return 'create';
    if (path.includes('/active')) return 'active';
    if (path.includes('/history')) return 'history';
    if (path.includes('/profile')) return 'profile';
    return 'overview';
  };

  // Render Create Request Form
  const renderCreateRequest = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold">Create Blood Request</h2>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission
          }} className="space-y-4">
            {/* Two columns layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Blood Group */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  value={newRequest.bloodGroup}
                  onChange={(e) => setNewRequest({...newRequest, bloodGroup: e.target.value})}
                >
                  <option value="">Select</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              {/* Units */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Units Required <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  placeholder="Units"
                  value={newRequest.units}
                  onChange={(e) => setNewRequest({...newRequest, units: e.target.value})}
                />
              </div>
            </div>

            {/* Two columns layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Urgency Level */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Urgency Level <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  value={newRequest.urgencyLevel}
                  onChange={(e) => setNewRequest({...newRequest, urgencyLevel: e.target.value})}
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* Required Date */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Required By <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  value={newRequest.requiredDate}
                  onChange={(e) => setNewRequest({...newRequest, requiredDate: e.target.value})}
                />
              </div>
            </div>

            {/* Hospital Location */}
            <div>
              <label className="text-xs font-medium text-gray-700">
                Hospital Location <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  required
                  type="text"
                  className="w-full rounded-lg border-gray-300 pl-10 pr-4 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  placeholder="Enter hospital location"
                  value={newRequest.hospitalLocation}
                  onChange={(e) => setNewRequest({...newRequest, hospitalLocation: e.target.value})}
                />
              </div>
            </div>

            {/* Patient Details & Notes in one row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">Patient Details</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  placeholder="Patient name & age"
                  value={newRequest.patientDetails}
                  onChange={(e) => setNewRequest({...newRequest, patientDetails: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Additional Notes</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  placeholder="Any additional info"
                  value={newRequest.additionalNotes}
                  onChange={(e) => setNewRequest({...newRequest, additionalNotes: e.target.value})}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewRequestForm(false)}
                className="px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-sm font-medium text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );

  const handleCancelRequest = (requestId) => {
    // Filter out the canceled request
    const updatedRequests = activeRequests.filter(request => request.id !== requestId);
    setActiveRequests(updatedRequests);
    
    // Add the canceled request to history
    const canceledRequest = activeRequests.find(request => request.id === requestId);
    if (canceledRequest) {
      const historyEntry = {
        id: `HIST${Date.now()}`,
        bloodGroup: canceledRequest.bloodGroup,
        hospitalName: canceledRequest.hospitalLocation.split(',')[0],
        status: 'Cancelled',
        date: new Date().toISOString().split('T')[0],
        donorCount: canceledRequest.donors.length,
        location: canceledRequest.hospitalLocation.split(',')[1].trim()
      };
      setRequestHistory([historyEntry, ...requestHistory]);
    }
  };

  // Render Active Requests
  const renderActiveRequests = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Active Blood Requests</h2>
        <button
          onClick={() => setShowNewRequestForm(true)}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 ease-in-out"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeRequests.map(request => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Request Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    request.urgencyLevel === 'Critical' ? 'bg-red-100' :
                    request.urgencyLevel === 'High' ? 'bg-orange-100' : 'bg-blue-100'
                  }`}>
                    <Droplet className={`w-5 h-5 ${
                      request.urgencyLevel === 'Critical' ? 'text-red-600' :
                      request.urgencyLevel === 'High' ? 'text-orange-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {request.bloodGroup} Blood Request
                    </h3>
                    <p className="text-sm text-gray-500">
                      Request ID: {request.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.status}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Request Details */}
            <div className="p-4 space-y-4">
              {/* Location and Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="truncate">{request.hospitalLocation}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{request.createdAt}</span>
                </div>
              </div>

              {/* Notes */}
              <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <p className="line-clamp-2">{request.additionalNotes}</p>
              </div>

              {/* Donors Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">
                    Connected Donors ({request.donors.length})
                  </h4>
                  <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                    Find Donors
                  </button>
                </div>
                
                <div className="space-y-2">
                  {request.donors.map(donor => (
                    <div key={donor.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">{donor.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        donor.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {donor.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100">
                  <Trash className="w-4 h-4 mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {activeRequests.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Active Requests</h3>
          <p className="text-gray-500 mt-2">You don't have any active blood requests at the moment.</p>
        </div>
      )}
    </motion.div>
  );

  // Render Request History
  const renderRequestHistory = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Request History</h2>
            <p className="text-sm text-gray-500 mt-1">Overview of your past blood requests</p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex items-center gap-3">
            <select className="text-sm border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500">
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select className="text-sm border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500">
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <h4 className="text-2xl font-bold text-gray-900 mt-1">{requestHistory.length}</h4>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <BarChart className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Completed</p>
                <h4 className="text-2xl font-bold text-green-700 mt-1">
                  {requestHistory.filter(r => r.status === 'Completed').length}
                </h4>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Cancelled</p>
                <h4 className="text-2xl font-bold text-red-700 mt-1">
                  {requestHistory.filter(r => r.status === 'Cancelled').length}
                </h4>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Request History Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hospital Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requestHistory.map((request, index) => (
                <motion.tr 
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                        <Droplet className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          Blood Group: {request.bloodGroup}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{request.hospitalName}</div>
                    <div className="text-sm text-gray-500">{request.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {request.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreVertical className="w-4 h-4 inline" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {requestHistory.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No Request History</h3>
              <p className="text-gray-500 mt-2">Your past blood requests will appear here</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center text-sm text-gray-500">
            Showing <span className="font-medium mx-1">1</span> to <span className="font-medium mx-1">10</span> of{' '}
            <span className="font-medium mx-1">{requestHistory.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Render Profile Settings
  const renderProfile = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <Hospital className="w-10 h-10 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{profile.hospitalName}</h1>
              <p className="text-red-100 mt-1">{profile.type}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                  Reg. No: {profile.registrationNumber}
                </span>
                <span className="px-3 py-1 bg-green-500 rounded-full text-sm text-white flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              {isEditing ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <input
                    type="tel"
                    value={profile.emergencyContact}
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profile.operatingHours}
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    onChange={(e) => setProfile({ ...profile, operatingHours: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              Location Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={profile.address}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-1 focus:ring-red-500"
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={profile.city}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-1 focus:ring-red-500"
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={profile.state}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-1 focus:ring-red-500"
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={profile.postalCode}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-1 focus:ring-red-500"
                    onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-500" />
              Quick Statistics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Requests</span>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-600">Successful Donations</span>
                <span className="font-semibold text-green-600">182</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-600">Active Requests</span>
                <span className="font-semibold text-blue-600">12</span>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gray-500" />
              Verification Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Email Verified</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Phone Verified</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">License Verified</span>
              </div>
            </div>
          </div>

          {/* Settings Quick Access */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" />
                Manage Team Members
              </button>
              <button className="w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notification Settings
              </button>
              <button className="w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Security Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  // Add this new overview render function
  const renderOverview = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Quick Actions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 cursor-pointer group"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-start justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">Quick Action</span>
          </div>
          <h3 className="text-xl font-bold mt-4">Create Request</h3>
          <p className="text-white/80 text-sm mt-1">Create a new blood request instantly</p>
          <div className="flex items-center mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Create Now <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 cursor-pointer group"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-start justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">Donors</span>
          </div>
          <h3 className="text-xl font-bold mt-4">Find Donors</h3>
          <p className="text-white/80 text-sm mt-1">Search and connect with donors</p>
          <div className="flex items-center mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Search Now <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 cursor-pointer group"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-start justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">Analytics</span>
          </div>
          <h3 className="text-xl font-bold mt-4">View Reports</h3>
          <p className="text-white/80 text-sm mt-1">Track and analyze your requests</p>
          <div className="flex items-center mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Stats <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </motion.div>
      </div>

      {/* Recent Requests */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Requests</h2>
          <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          {activeRequests.slice(0, 3).map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  request.urgencyLevel === 'Critical' ? 'bg-red-100 text-red-600' :
                  request.urgencyLevel === 'High' ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{request.bloodGroup} Blood Required</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {request.hospitalLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  request.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {request.status}
                </span>
                <button className="p-2 hover:bg-gray-200 rounded-full">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Request Status Distribution</h3>
          <div className="space-y-4">
            {[
              { label: 'Pending', value: 45, color: 'bg-yellow-500' },
              { label: 'In Progress', value: 30, color: 'bg-blue-500' },
              { label: 'Completed', value: 25, color: 'bg-green-500' }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Blood Type Requirements</h3>
          <div className="grid grid-cols-4 gap-3">
            {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map((type) => (
              <div key={type} className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-lg font-bold text-red-600">{type}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.floor(Math.random() * 10)} units
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Render content based on current section
  const renderContent = () => {
    const section = getCurrentSection();
    switch (section) {
      case 'create':
        return renderCreateRequest();
      case 'active':
        return renderActiveRequests();
      case 'history':
        return renderRequestHistory();
      case 'profile':
        return renderProfile();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-[80px] md:left-[280px] right-0 z-30 px-6 pt-6 bg-gray-50">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Hospital className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">Requester Dashboard</h1>
                <p className="text-red-100 text-sm">Manage your blood requests efficiently</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
              <Building className="h-5 w-5 text-red-200" />
              <span className="text-white font-medium">{profile.hospitalName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative mt-[144px] px-6 pb-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default RequesterDashboard;