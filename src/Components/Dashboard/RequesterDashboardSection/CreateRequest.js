import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin } from 'react-feather';
import { toast } from 'react-toastify';

const CreateRequest = ({ setShowNewRequestForm, setActiveRequests, activeRequests, setRequestHistory, requestHistory }) => {
  const [newRequest, setNewRequest] = useState({
    bloodGroup: '',
    units: '',
    urgencyLevel: 'Normal',
    requiredDate: '',
    hospitalLocation: '',
    patientDetails: '',
    additionalNotes: '',
    donors: []
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!newRequest.bloodGroup || !newRequest.units || !newRequest.requiredDate || !newRequest.hospitalLocation) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Create new request with ID
      const newRequestWithId = {
        ...newRequest,
        id: `REQ${Date.now()}`,
        status: 'Active',
        date: new Date().toISOString().split('T')[0]
      };

      // Add to active requests
      setActiveRequests(prev => [...prev, newRequestWithId]);
      
      toast.success('Blood request created successfully');
      setShowNewRequestForm(false);
    } catch (error) {
      toast.error(error.message || 'Failed to create request');
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
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

  return renderCreateRequest();
};

export default CreateRequest;
