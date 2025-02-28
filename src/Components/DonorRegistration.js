import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function DonorRegistration() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodType: '',
    phone: '',
    address: '',
    city: '',
    lastDonation: '',
    medicalConditions: '',
    agreeToTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.agreeToTerms) {
        throw new Error('Please agree to the terms and conditions')
      }

      await register({
        ...formData,
        role: 'donor'
      })
      
      toast.success('Registration successful!')
      navigate('/donor-dashboard')
    } catch (error) {
      toast.error(error.message || 'Registration failed')
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
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Become a Donor</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Blood Type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.bloodType}
                  onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                >
                  <option value="">Select Blood Type</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Last Donation Date (if any)
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                value={formData.lastDonation}
                onChange={(e) => setFormData({...formData, lastDonation: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Medical Conditions
              </label>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="3"
                placeholder="List any medical conditions..."
                value={formData.medicalConditions}
                onChange={(e) => setFormData({...formData, medicalConditions: e.target.value})}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-red-600"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
              />
              <label className="ml-2 text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register as Donor'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 