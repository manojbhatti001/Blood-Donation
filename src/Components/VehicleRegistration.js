import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Phone, Calendar, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { AnimatedSection, fadeIn } from './Animation'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function VehicleRegistration() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    ownerName: user?.name || '',
    vehicleType: '',
    licensePlate: '',
    pincode: '',
    capacity: '',
    contactNumber: '',
    availabilityDate: '',
    availableDays: '',
    isCurrentlyAvailable: false,
    additionalNotes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const vehicleTypes = [
    { value: 'car', label: 'Car' },
    { value: 'bike', label: 'Bike' },
    { value: 'ambulance', label: 'Ambulance' },
    { value: 'van', label: 'Van' },
    { value: 'other', label: 'Other' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      const requiredFields = ['ownerName', 'vehicleType', 'licensePlate', 'pincode', 'capacity', 'contactNumber']
      const missingFields = requiredFields.filter(field => !formData[field])
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`)
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Store in localStorage for demo
      const vehicles = JSON.parse(localStorage.getItem('volunteerVehicles') || '[]')
      const newVehicle = {
        id: Date.now(),
        ...formData,
        registrationDate: new Date().toISOString(),
        status: 'active'
      }
      vehicles.push(newVehicle)
      localStorage.setItem('volunteerVehicles', JSON.stringify(vehicles))

      toast.success('Vehicle registered successfully!')
      // Reset form
      setFormData({
        ownerName: user?.name || '',
        vehicleType: '',
        licensePlate: '',
        pincode: '',
        capacity: '',
        contactNumber: '',
        availabilityDate: '',
        availableDays: '',
        isCurrentlyAvailable: false,
        additionalNotes: ''
      })
    } catch (error) {
      toast.error(error.message || 'Failed to register vehicle')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Volunteer Vehicle Registration</h1>
            <p className="text-gray-600">Register your vehicle for emergency transportation services</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Owner Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Vehicle Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                    required
                  >
                    <option value="">Select Vehicle Type</option>
                    {vehicleTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    License Plate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    value={formData.licensePlate}
                    onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Passenger Capacity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Available From
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    value={formData.availabilityDate}
                    onChange={(e) => setFormData({...formData, availabilityDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Number of Days Available
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                    value={formData.availableDays}
                    onChange={(e) => setFormData({...formData, availableDays: e.target.value})}
                  />
                </div>
              </div>

              {/* Current Availability */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={formData.isCurrentlyAvailable}
                  onChange={(e) => setFormData({...formData, isCurrentlyAvailable: e.target.checked})}
                />
                <label className="ml-2 block text-gray-700">
                  Currently Available for Emergency Services
                </label>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Additional Notes
                </label>
                <textarea
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                  rows="3"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                  placeholder="Any additional information..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Registering Vehicle...
                  </span>
                ) : "Register Vehicle"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 