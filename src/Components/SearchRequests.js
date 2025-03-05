import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {  Phone, MapPin, Clock, AlertCircle, Hospital } from 'lucide-react'
import { AnimatedSection } from './Animation'

export default function SearchRequests() {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [searchPhone, setSearchPhone] = useState('')

  useEffect(() => {
    // Load requests from localStorage
    const savedRequests = JSON.parse(localStorage.getItem('bloodRequests') || '[]')
    setRequests(savedRequests)
    setFilteredRequests(savedRequests)
  }, [])

  const handleSearch = (value) => {
    setSearchPhone(value)
    if (value.trim() === '') {
      setFilteredRequests(requests)
    } else {
      const filtered = requests.filter(req => 
        req.phone.includes(value.trim())
      )
      setFilteredRequests(filtered)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="pt-16 sm:pt-20 pb-6 sm:pb-10">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              Track Blood Request
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto px-4">
              Enter the phone number associated with your blood request to check its status
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-xl mx-auto mb-6 sm:mb-10 px-4">
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                <input
                  type="tel"
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all text-sm sm:text-base"
                  placeholder="Enter phone number..."
                  value={searchPhone}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          {filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 px-4">
              {filteredRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-md mx-auto m-4"
            >
              <AlertCircle className="w-8 sm:w-12 h-8 sm:h-12 text-red-500 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Requests Found</h3>
              <p className="text-sm sm:text-base text-gray-600">
                No blood requests found for this phone number. Please check the number and try again.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function RequestCard({ request }) {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-base sm:text-lg font-bold text-red-600">{request.bloodType}</span>
            </div>
            <div className="ml-2 sm:ml-3">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">{request.requestorName}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{request.phone}</p>
            </div>
          </div>
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
            request.urgencyLevel === 'critical' ? 'bg-red-100 text-red-700' :
            request.urgencyLevel === 'urgent' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {request.urgencyLevel}
          </span>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center text-gray-600">
            <Hospital className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1.5 sm:mr-2 text-gray-400" />
            <span className="text-xs sm:text-sm truncate">{request.hospital}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1.5 sm:mr-2 text-gray-400" />
            <span className="text-xs sm:text-sm truncate">{request.city}, {request.state}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1.5 sm:mr-2 text-gray-400" />
            <span className="text-xs sm:text-sm">{new Date(request.dateCreated).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-t">
        <button 
          className="w-full bg-red-600 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-700 transition-all transform hover:scale-102 hover:shadow-md"
          onClick={() => window.location.href = `tel:${request.phone}`}
        >
          Contact Requestor
        </button>
      </div>
    </motion.div>
  )
}