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
    phone: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    city: '',
    state: '',
    agreeToTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.agreeToTerms) {
        throw new Error('Please agree to the terms and conditions')
      }
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        bloodGroup: formData.bloodGroup,
        city: formData.city,
        state: formData.state,
        userType: 'donor'
      }

      await register(registrationData)
      toast.success('Registration successful!')
      navigate('/donor-dashboard')
    } catch (error) {
      toast.error(error.message || 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-5">
            {/* Left side - Image with Overlay */}
            <div className="relative hidden md:block md:col-span-2">
              <img 
                src="/images/Blood_donation_process.jpg" 
                alt="Blood Donation" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0  flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-bold">Save Lives Today</h3>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    Save up to 3 lives
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    </svg>
                    30-45 minutes process
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Compressed Form */}
            <div className="md:col-span-3 p-4">
            <div className="text-center mb-3">
  <h2 className="text-xl font-bold text-gray-900">
    Become a <span style={{color: 'red'}}>Donor</span>
  </h2> {/* Closed the h2 tag properly */}
</div>


              <form onSubmit={handleSubmit} className="space-y-2">
                {/* Personal Details */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-1.5 text-sm border rounded"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Blood Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full p-1.5 text-sm border rounded"
                      value={formData.bloodType}
                      onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                    >
                      <option value="">Select</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full p-1.5 text-sm border rounded"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full p-1.5 text-sm border rounded"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                {/* Password and Confirm Password */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full p-1.5 text-sm border rounded"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full p-1.5 text-sm border rounded"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-1.5 text-sm border rounded"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-1.5 text-sm border rounded"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                    />
                  </div>
                </div>
                {/* //passwordField */}
                

                {/* Optional NGO Info - Improved */}
                <div className="mt-3 border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-gray-700">NGO Information</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Optional</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        NGO Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-1.5 text-sm border rounded bg-gray-50 focus:bg-white focus:border-red-200 transition-colors"
                        value={formData.ngoName}
                        onChange={(e) => setFormData({...formData, ngoName: e.target.value})}
                        placeholder="Enter NGO name if any"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        NGO Address
                      </label>
                      <input
                        type="text"
                        className="w-full p-1.5 text-sm border rounded bg-gray-50 focus:bg-white focus:border-red-200 transition-colors"
                        value={formData.ngoAddress}
                        onChange={(e) => setFormData({...formData, ngoAddress: e.target.value})}
                        placeholder="Enter NGO location"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-center bg-red-50/50 p-2 rounded text-xs mt-2">
                  <input
                    type="checkbox"
                    className="h-3 w-3 text-red-600 rounded"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                  />
                  <label className="ml-2 text-gray-700">
                    I agree to the <span className="text-red-600 hover:underline cursor-pointer">terms</span>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-red-700 transition-colors shadow-md mt-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register as Donor'}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Login Link Section - Made Bigger */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8 bg-gray-50 max-w-md mx-auto p-4 rounded-xl shadow-sm"
        >
          <p className="text-gray-700 text-base">
            Already registered? {' '}
            <motion.a
              href="/login"
              className="text-red-600 font-semibold hover:text-red-700 hover:underline inline-flex items-center text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login here
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </p>
        </motion.div>
      </div>
    </div>
  )
} 