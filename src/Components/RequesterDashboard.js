import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hospital, Clock, AlertCircle, CheckCircle, MapPin, Droplet, Users } from 'lucide-react';

const RequesterDashboard = () => {
  const [requesterDetails, setRequesterDetails] = useState({
    hospitalInfo: {
      name: 'City Hospital',
      address: '123 Medical Center Blvd',
      city: 'Metropolis',
      state: 'ST',
      contactPerson: 'Dr. Jane Smith',
      phone: '(555) 123-4567'
    },
    requestStats: {
      totalRequests: 25,
      pendingRequests: 5,
      completedRequests: 20,
      urgentRequests: 2
    },
    activeRequests: [
      {
        id: 1,
        bloodType: 'O+',
        units: 2,
        urgency: 'High',
        dateNeeded: '2024-03-22',
        status: 'Pending',
        matches: 3
      }
    ],
    requestHistory: [
      {
        id: 1,
        date: '2024-03-15',
        bloodType: 'A+',
        units: 1,
        status: 'Completed',
        donor: 'John Doe',
        urgency: 'Medium'
      }
    ]
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Requester Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your blood requests and track their status</p>
        </div>
        
        {/* Wallet Card - Mobile View */}
        <div className="md:hidden bg-white rounded-lg shadow p-3">
          <div className="flex items-center space-x-2">
            <div className="bg-red-50 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Wallet Balance</p>
              <p className="text-sm font-semibold text-gray-700">₹1,234</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Hospital className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{requesterDetails.hospitalInfo.name}</h2>
              <p className="text-gray-600">{requesterDetails.hospitalInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Contact Person</p>
            <p className="text-xl font-semibold">{requesterDetails.hospitalInfo.contactPerson}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Phone</p>
            <p className="text-xl font-semibold">{requesterDetails.hospitalInfo.phone}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">Location</p>
            <p className="text-xl font-semibold">{requesterDetails.hospitalInfo.city}, {requesterDetails.hospitalInfo.state}</p>
          </div>
        </div>
      </motion.div>

      {/* Request Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <Clock className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Total</h3>
          <p className="text-3xl font-bold text-blue-600">{requesterDetails.requestStats.totalRequests}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <AlertCircle className="h-8 w-8 text-yellow-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{requesterDetails.requestStats.pendingRequests}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{requesterDetails.requestStats.completedRequests}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <AlertCircle className="h-8 w-8 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Urgent</h3>
          <p className="text-3xl font-bold text-red-600">{requesterDetails.requestStats.urgentRequests}</p>
        </motion.div>
      </div>

      {/* Active Requests */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Active Requests</h3>
        <div className="space-y-4">
          {requesterDetails.activeRequests.map(request => (
            <div key={request.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-red-600">{request.bloodType}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{request.units} Units Needed</p>
                    <p className="text-sm text-gray-600">By {request.dateNeeded}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.urgency === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {request.urgency}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{request.matches} potential donors found</span>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  View Matches
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Request History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Request History</h3>
        <div className="space-y-4">
          {requesterDetails.requestHistory.map(request => (
            <div key={request.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-red-600">{request.bloodType}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{request.units} Units</p>
                    <p className="text-sm text-gray-600">{request.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {request.status}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">Donor: {request.donor}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RequesterDashboard;