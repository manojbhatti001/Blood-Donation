import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin } from 'react-feather';
import { toast } from 'react-toastify';

const majorCities = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kakinada", "Rajahmundry", "Anantapur", "Kadapa"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Namsai", "Tezu", "Roing", "Ziro", "Bomdila", "Tawang", "Along"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Diphu", "Golaghat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Arrah", "Begusarai", "Katihar", "Munger"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh", "Jagdalpur", "Dhamtari", "Durg", "Mahasamund"]
  // ... rest of the states and cities
};

const CreateRequest = ({ setShowNewRequestForm, activeRequests, setActiveRequests }) => {
  // Function to get current date and time in local timezone
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [newRequest, setNewRequest] = useState({
    patientName: '',
    patientPhone: '',
    bloodGroup: '',
    units: '',
    urgencyLevel: 'Normal',
    requiredDate: getCurrentDateTime(),
    hospitalLocation: '',
    state: '',
    city: '',
    additionalNotes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!newRequest.patientName || !newRequest.patientPhone || !newRequest.bloodGroup || 
          !newRequest.units || !newRequest.hospitalLocation ||
          !newRequest.state || !newRequest.city) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Create new request with ID and formatted data
      const newRequestWithId = {
        id: `REQ${Date.now()}`,
        ...newRequest,
        status: 'Pending',
        donors: [],
        createdAt: new Date().toISOString().split('T')[0],
        hospitalLocation: `${newRequest.hospitalLocation}, ${newRequest.city}, ${newRequest.state}`
      };

      // Add to active requests
      setActiveRequests([newRequestWithId, ...activeRequests]);
      
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
            {/* Patient Details */}
            <div className="grid grid-cols-2 gap-4">
              {/* Patient Name */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  placeholder="Enter patient name"
                  value={newRequest.patientName}
                  onChange={(e) => setNewRequest({...newRequest, patientName: e.target.value})}
                />
              </div>

              {/* Patient Phone */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Patient Phone <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="tel"
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  placeholder="Enter phone number"
                  value={newRequest.patientPhone}
                  onChange={(e) => setNewRequest({...newRequest, patientPhone: e.target.value})}
                />
              </div>
            </div>

            {/* Blood Group and Units */}
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
                  Current Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="datetime-local"
                  value={getCurrentDateTime()}
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  readOnly
                />
              </div>
            </div>

            {/* Hospital Location */}
            <div>
              <label className="text-xs font-medium text-gray-700">
               Location <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                placeholder="Enter location"
                value={newRequest.hospitalLocation}
                onChange={(e) => setNewRequest({...newRequest, hospitalLocation: e.target.value})}
              />
            </div>

            {/* State and City Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  value={newRequest.state}
                  onChange={(e) => {
                    setNewRequest({
                      ...newRequest,
                      state: e.target.value,
                      city: '' // Reset city when state changes
                    });
                  }}
                >
                  <option value="">Select State</option>
                  {Object.keys(majorCities).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  value={newRequest.city}
                  onChange={(e) => setNewRequest({...newRequest, city: e.target.value})}
                  disabled={!newRequest.state}
                >
                  <option value="">Select City</option>
                  {newRequest.state && majorCities[newRequest.state]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
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
