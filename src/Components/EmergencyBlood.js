import { AlertCircle, Clock, MapPin, Phone, CheckCircle, Search, Hospital } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeIn, slideIn } from "./Animation";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function EmergencyBlood() {
  const navigate = useNavigate();

  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    bloodType: "",
    requestorName: "",
    phone: "",
    city: "",
    state: "",
    hospital: "",
    urgencyLevel: "normal",
    additionalInfo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = ['bloodType', 'requestorName', 'phone', 'city', 'state', 'hospital'];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        // Fix: Add backticks for template literal
        // throw new Error(Please fill in all required fields: ${missingFields.join(', ')});
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store request in localStorage for demo purposes
      const requests = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
      const newRequest = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        dateCreated: new Date().toISOString()
      };
      requests.push(newRequest);
      localStorage.setItem('bloodRequests', JSON.stringify(requests));

      toast.success("Emergency request submitted successfully!");
      navigate('/search-requests');
    } catch (error) {
      toast.error(error.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <motion.section 
        className="bg-red-600 text-white py-6"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="container px-4 mx-auto">
          <motion.div 
            className="flex items-center justify-center space-x-3 mb-8"
            variants={slideIn}
          >
            {/* <AlertCircle className="w-12 h-12 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold">Emergency Blood Request</h1> */}
          </motion.div>
          <motion.div className="flex justify-center gap-4 mt-8">
            <button
              className="bg-white text-red-600 px-8 py-3 rounded-full font-medium hover:bg-red-50 transition-colors shadow-lg"
              onClick={() => navigate('/search-requests')}
            >
              <Search className="w-5 h-5 inline-block mr-2" />
              Search Existing Requests
            </button>
          </motion.div>
        </div>
      </motion.section>

      <AnimatedSection>
        <div className="container max-w-4xl px-4 mx-auto py-6">
          <div className="flex flex-col md:flex-row items-stretch bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Image Section - Hidden on mobile */}
            <div className="hidden md:block w-full md:w-1/2 relative min-h-[500px]">
              <img 
                src="/images/Blood_donation_process.jpg" 
                alt="Emergency Blood" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h2 className="text-xl font-bold mb-1">Emergency Blood Request</h2>
                <p className="text-sm text-gray-200">Fill out the form to submit your emergency blood request.</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-5 sm:p-8">
              <div className="md:hidden mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Blood Request</h2>
                <p className="text-gray-600">Fill out the form to submit your emergency blood request.</p>
              </div>
              <form className="space-y-3" onSubmit={handleSubmit}>
                {/* Blood Type Selection */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Blood Type Required <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="bloodType"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 transition-all bg-gray-50 text-sm"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      Requestor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="requestorName"
                      className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                      placeholder="Enter your name"
                      value={formData.requestorName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                      placeholder="Enter city name"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1 text-sm">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                      placeholder="Enter state name"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Hospital Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hospital"
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    placeholder="Enter hospital name"
                    value={formData.hospital}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Urgency Level */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Urgency Level
                  </label>
                  <select
                    name="urgencyLevel"
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
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
                  <label className="block text-gray-700 font-medium mb-1 text-sm">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
                    rows="2"
                    placeholder="Any additional details..."
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 text-sm"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
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
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection>
        <div className="container px-4 mx-auto py-16 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
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
  );
}

function ProcessCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="inline-block p-4 bg-red-50 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}