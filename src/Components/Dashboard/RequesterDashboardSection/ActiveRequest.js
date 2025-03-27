import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Droplet, 
  MoreVertical, 
  MapPin, 
  Calendar, 
  User, 
  Phone,
  AlertCircle,
  Home
} from 'react-feather';

// Dummy data for active requests
const dummyActiveRequests = [
  {
    id: 'REQ001',
    bloodGroup: 'A+',
    units: 2,
    urgencyLevel: 'Critical',
    status: 'Pending',
    patientName: 'John Doe',
    patientPhone: '+91 98765-43210',
    State: 'Maharashtra',
    City:'mumbai',
    Location: 'mumbai',
    createdAt: '2024-03-25',
    donors: []
  },
 

];

const ActiveRequest = ({ setShowNewRequestForm, activeRequests = dummyActiveRequests }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Active Blood Requests</h2>
        <button
          onClick={() => setShowNewRequestForm(true)}
          className="inline-flex items-center mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 ease-in-out"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeRequests && activeRequests.length > 0 ? (
          activeRequests.map(request => (
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
                        {request.bloodGroup} Blood Request ({request.units} units)
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
                {/* Patient Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{request.patientName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{request.patientPhone}</span>
                  </div>
                </div>

                {/* Location and Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{request.Location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{request.createdAt}</span>
                  </div>
                </div>

                {/* state and city */}
                <div className="flex items-center text-sm text-gray-600">
                  <Home className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="truncate">{request.State}</span>
                </div>
                {/* City */}
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="truncate">{request.City}</span>
                </div>


                {/* Notes */}
                {request.additionalNotes && (
                  <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    <p className="line-clamp-2">{request.additionalNotes}</p>
                  </div>
                )}

                {/* Donor Count */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Donors:</span> {request.donors.length}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 text-center bg-white rounded-xl shadow-lg p-6 sm:p-8"
          >
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">No Active Requests</h3>
            <p className="text-base text-gray-600">
              You don't have any active blood requests at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ActiveRequest;
