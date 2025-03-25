import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Droplet, 
  MoreVertical, 
  MapPin, 
  Calendar, 
  User, 
  Edit, 
  Trash, 
  AlertCircle 
} from 'react-feather';

const ActiveRequest = ({ setShowNewRequestForm }) => {
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

  return renderActiveRequests();
};

export default ActiveRequest;
