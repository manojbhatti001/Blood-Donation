import { AlertCircle, Clock, MapPin, Phone, CheckCircle, Search, Hospital } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { AnimatedSection, fadeIn, slideIn } from "./Animation"
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function EmergencyBlood() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    bloodType: "",
    requestorName: "",
    phone: "",
    city: "",
    hospital: "",
    urgencyLevel: "normal",
    additionalInfo: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      const requiredFields = ['bloodType', 'requestorName', 'phone', 'city', 'hospital']
      const missingFields = requiredFields.filter(field => !formData[field])
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`)
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store request in localStorage for demo purposes
      const requests = JSON.parse(localStorage.getItem('bloodRequests') || '[]')
      const newRequest = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        dateCreated: new Date().toISOString()
      }
      requests.push(newRequest)
      localStorage.setItem('bloodRequests', JSON.stringify(requests))

      toast.success("Emergency request submitted successfully!")
      navigate('/search-requests')
    } catch (error) {
      toast.error(error.message || "Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section 
        className="bg-red-600 text-white py-12"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="container px-4 mx-auto">
          <motion.div 
            className="flex items-center justify-center space-x-3 mb-6"
            variants={slideIn}
          >
            <AlertCircle className="w-12 h-12 animate-pulse" />
            <h1 className="text-4xl font-bold">Emergency Blood Request</h1>
          </motion.div>
          <motion.div className="flex justify-center gap-4 mt-8">
            <button
              className="bg-white text-red-600 px-6 py-2 rounded-full font-medium hover:bg-red-50 transition-colors"
              onClick={() => navigate('/search-requests')}
            >
              <Search className="w-4 h-4 inline-block mr-2" />
              Search Existing Requests
            </button>
          </motion.div>
        </div>
      </motion.section>

      <AnimatedSection className="py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Blood Type Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Blood Type Required <span className="text-red-500">*</span>
                </label>
                <select 
                  name="bloodType"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-all"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Type</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Requestor Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Requestor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="requestorName"
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter your name"
                    value={formData.requestorName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter city name"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Hospital Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hospital"
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter hospital name"
                    value={formData.hospital}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Urgency Level */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Urgency Level
                </label>
                <select
                  name="urgencyLevel"
                  className="w-full p-3 border rounded-lg"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                  placeholder="Any additional details..."
                  value={formData.additionalInfo}
                  onChange={handleChange}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting Request...
                  </span>
                ) : "Submit Emergency Request"}
              </motion.button>
            </form>
          </div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="py-12 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ProcessCard
              icon={<Clock className="w-8 h-8 text-red-600" />}
              title="Quick Response"
              description="We process emergency requests immediately and contact nearby donors"
            />
            <ProcessCard
              icon={<MapPin className="w-8 h-8 text-red-600" />}
              title="Local Network"
              description="Connect with verified donors in your area within minutes"
            />
            <ProcessCard
              icon={<Hospital className="w-8 h-8 text-red-600" />}
              title="Hospital Coordination"
              description="We coordinate with hospitals to ensure smooth process"
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

function ProcessCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md text-center"
      whileHover={{ y: -5 }}
    >
      <div className="inline-block p-3 bg-red-50 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
} 