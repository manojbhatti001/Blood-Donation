import { AlertCircle, Clock, MapPin, Phone, CheckCircle, Search, Hospital, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeIn, slideIn } from "./Animation";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const availableBloodRequests = [
  {
    requestId: "REQ-2024-001",
    bloodType: "A+",
    requestorName: "John Smith",
    hospital: "Apollo Hospital",
    city: "Mumbai",
    state: "Maharashtra",
    status: "Pending",
    urgencyLevel: "critical",
    dateCreated: "2024-03-20",
    phone: "+91 98765 43210"
  },
  {
    requestId: "REQ-2024-002",
    bloodType: "O-",
    requestorName: "Priya Patel",
    hospital: "Fortis Hospital",
    city: "Delhi",
    state: "Delhi",
    status: "Pending",
    urgencyLevel: "urgent",
    dateCreated: "2024-03-21",
    phone: "+91 98765 43211"
  },
  {
    requestId: "REQ-2024-003",
    bloodType: "B+",
    requestorName: "Rahul Kumar",
    hospital: "Lilavati Hospital",
    city: "Bangalore",
    state: "Karnataka",
    status: "Completed",
    urgencyLevel: "normal",
    dateCreated: "2024-03-19",
    phone: "+91 98765 43212"
  },
  {
    requestId: "REQ-2024-004",
    bloodType: "AB+",
    requestorName: "Sarah Wilson",
    hospital: "Max Hospital",
    city: "Pune",
    state: "Maharashtra",
    status: "Pending",
    urgencyLevel: "urgent",
    dateCreated: "2024-03-22",
    phone: "+91 98765 43213"
  },
  {
    requestId: "REQ-2024-005",
    bloodType: "O+",
    requestorName: "Amit Shah",
    hospital: "AIIMS",
    city: "Chennai",
    state: "Tamil Nadu",
    status: "Pending",
    urgencyLevel: "critical",
    dateCreated: "2024-03-22",
    phone: "+91 98765 43214"
  }
];

export default function EmergencyBlood() {
  const navigate = useNavigate();
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

  // Add this new function to handle accepting requests
  const handleAcceptRequest = async (request) => {
    try {
      // Update the request status in localStorage
      const savedRequests = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
      const updatedRequests = savedRequests.map(req => 
        req.requestId === request.requestId 
          ? { ...req, status: 'Accepted' }
          : req
      );
      localStorage.setItem('bloodRequests', JSON.stringify(updatedRequests));

      // Show success message
      toast.success(`Successfully accepted request for ${request.bloodType} blood`);

      // Optionally navigate to accepted requests page
      navigate('/dashboard/accepted');
    } catch (error) {
      toast.error('Failed to accept request. Please try again.');
      console.error('Error accepting request:', error);
    }
  };

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

      {/* Available Blood Requests Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Blood Requests</h2>
          <div className="grid gap-4">
            {availableBloodRequests.map((request) => (
              <motion.div
                key={request.requestId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border rounded-lg shadow-sm p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-red-600">{request.bloodType}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.requestId}</h3>
                      <p className="text-sm text-gray-600">{request.requestorName}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.status === 'Completed' 
                      ? 'bg-green-100 text-green-700'
                      : request.urgencyLevel === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : request.urgencyLevel === 'urgent'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {request.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Hospital className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{request.hospital}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{`${request.city}, ${request.state}`}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{request.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{request.dateCreated}</span>
                  </div>
                </div>

                {request.status === 'Pending' && (
                  <button 
                    className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    onClick={() => handleAcceptRequest(request)}
                  >
                    <span>Accept Request</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
      <AnimatedSection className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-gray-50" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600" />
        <div className="absolute -left-32 top-32 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -right-32 bottom-32 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60" />
        
        <div className="container px-4 mx-auto py-24 relative">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium mb-6">
                <span className="animate-pulse mr-2">●</span>
                Emergency Process
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-gray-800">
                How It Works
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative"
            >
              <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
                Our streamlined process ensures quick and efficient emergency blood support
                when every minute counts. We connect donors with recipients within minutes.
              </p>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-12 mb-16"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">15min</div>
                <div className="text-sm text-gray-600">Average Response</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative mt-24">
            {/* Connecting lines with animation */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 -translate-y-1/2">
              <div className="h-0.5 w-full bg-gradient-to-r from-red-200 via-red-400 to-red-200">
                <div className="animate-pulse-flow h-full w-20 bg-red-500 rounded-full" />
              </div>
            </div>

            <ProcessCard
              step="01"
              icon={<Clock className="w-8 h-8" />}
              title="Quick Response"
              description="Immediate processing of emergency requests with real-time donor matching"
              features={[
                "Under 15 min response",
                "24/7 availability",
                "Priority handling"
              ]}
              delay={0}
              gradient="from-red-500 to-red-600"
            />
            <ProcessCard
              step="02"
              icon={<MapPin className="w-8 h-8" />}
              title="Local Network"
              description="Connect with nearby verified donors in your immediate vicinity"
              features={[
                "Geo-location matching",
                "Verified donors only",
                "Distance tracking"
              ]}
              delay={0.2}
              gradient="from-blue-500 to-blue-600"
            />
            <ProcessCard
              step="03"
              icon={<Hospital className="w-8 h-8" />}
              title="Hospital Coordination"
              description="Seamless coordination with medical facilities for smooth transfer"
              features={[
                "Direct hospital contact",
                "Medical verification",
                "Transport assistance"
              ]}
              delay={0.4}
              gradient="from-emerald-500 to-emerald-600"
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

function ProcessCard({ step, icon, title, description, features, delay, gradient }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 
                    group-hover:shadow-2xl group-hover:scale-105 overflow-hidden">
        {/* Step Number */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 
                      rounded-full opacity-20 transform -rotate-12" />
        <span className="absolute top-4 right-4 font-bold text-4xl text-gray-200">{step}</span>

        {/* Icon Container */}
        <div className="relative mb-6">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 
                        rounded-full blur-lg transform group-hover:scale-110 transition-transform duration-300`} />
          <div className={`relative inline-flex items-center justify-center w-16 h-16 
                        rounded-full bg-gradient-to-br ${gradient} text-white
                        transform group-hover:scale-110 transition-all duration-300`}>
            {icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

        {/* Features List */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 * index }}
              className="flex items-center text-sm text-gray-600"
            >
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Bottom Gradient Bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
      </div>

      {/* Background Glow Effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${gradient} opacity-0 
                    group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-300`} />
    </motion.div>
  );
}