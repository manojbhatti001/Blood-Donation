import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Phone, Clock, AlertCircle } from 'lucide-react'
import { AnimatedSection } from './Animation'

export default function SearchRequests() {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [filters, setFilters] = useState({
    bloodType: '',
    city: '',
    status: ''
  })

  useEffect(() => {
    // Load requests from localStorage
    const savedRequests = JSON.parse(localStorage.getItem('bloodRequests') || '[]')
    setRequests(savedRequests)
    setFilteredRequests(savedRequests)
  }, [])

  const handleFilter = () => {
    let filtered = requests
    if (filters.bloodType) {
      filtered = filtered.filter(req => req.bloodType === filters.bloodType)
    }
    if (filters.city) {
      filtered = filtered.filter(req => 
        req.city.toLowerCase().includes(filters.city.toLowerCase())
      )
    }
    if (filters.status) {
      filtered = filtered.filter(req => req.status === filters.status)
    }
    setFilteredRequests(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Blood Requests</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Blood Type</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.bloodType}
                onChange={(e) => setFilters({...filters, bloodType: e.target.value})}
              >
                <option value="">All Types</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter city name"
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map(request => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No blood requests found matching your criteria
          </div>
        )}
      </div>
    </div>
  )
}

function RequestCard({ request }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-red-600">{request.bloodType}</span>
        <span className={`px-3 py-1 rounded-full text-sm ${
          request.urgencyLevel === 'critical' ? 'bg-red-100 text-red-600' :
          request.urgencyLevel === 'urgent' ? 'bg-yellow-100 text-yellow-600' :
          'bg-green-100 text-green-600'
        }`}>
          {request.urgencyLevel}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {request.hospital}, {request.city}
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {new Date(request.dateCreated).toLocaleDateString()}
        </div>
      </div>

      <div className="border-t pt-4">
        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
          Contact Requestor
        </button>
      </div>
    </motion.div>
  )
} 