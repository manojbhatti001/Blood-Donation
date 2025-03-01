import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Heart, Users, Calendar, AlertCircle, Info, BookOpen, Activity } from "lucide-react"
import { motion } from "framer-motion"



export default function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div>
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Placeholder image while video loads */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gray-900">
              <img
                src="/images/logo2.png"
                // alt="Blood Donation Logo"
                className="w-full h-full object-contain opacity-70"
              />
            </div>
          )}
          
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/images/blood-donation-video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay */}
          <div className="absolute inset-0  bg-black/50" />
        </div>
        
        <div className="container px-4 mx-auto text-center relative z-10 text-white">
          <div className="flex justify-center items-center mb-4"> {/* Reduced margin from mb-12 to mb-4 */}
            <img src="/images/logo2.png" alt="Blood Donation Logo" className="w-40 h-40 object-contain" /> {/* Reduced size from w-48 h-48 to w-40 h-40 */}
          </div>
          <h1 className="text-5xl font-bold mb-3"> {/* Reduced margin from mb-4 to mb-3 */}
            Every Drop <span className="text-red-500">Saves Lives</span>
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto"> {/* Reduced margin from mb-8 to mb-6 */}
            Your blood donation can save up to three lives. Join our community of donors today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/volunteer" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Donate Blood
            </Link>
            <Link to="/emergency-blood" className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10">
              Find Blood
            </Link>
          </div>
        </div>
      </section>

      {/* Information Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard
              title="Learn About Donation"
              description="Understand the donation process and its importance"
              image="/images/donor1.jpg"
              icon={<BookOpen className="w-6 h-6" />}
              link="/learn"
            />
            <InfoCard
              title="Eligibility Requirements"
              description="Check if you're eligible to donate blood"
              image="/images/donor2.jpg_large"
              icon={<Info className="w-6 h-6" />}
              link="/eligibility"
            />
            <InfoCard
              title="Impact Stories"
              description="Read stories from donors and recipients"
              image="/images/donor3.jpg"
              icon={<Activity className="w-6 h-6" />}
              link="/stories"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 ">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard 
              number="10,000+" 
              label="Active Donors" 
              icon={<Users className="w-8 h-8" />} 
              className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all duration-300"
            />
            <StatCard 
              number="15,000+" 
              label="Lives Saved" 
              icon={<Heart className="w-8 h-8" />}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
            />
            <StatCard 
              number="1,000+" 
              label="Monthly Donations" 
              icon={<Calendar className="w-8 h-8" />}
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300"
            />
            <StatCard 
              number="24/7" 
              label="Emergency Support" 
              icon={<AlertCircle className="w-8 h-8" />}
              className="bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Blood Types */}
      <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Blood Types</h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">Understanding blood types is crucial for donation. Find out which blood types are compatible with yours.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bloodTypes.map(type => (
              <motion.div 
                key={type.group}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700 hover:border-red-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-4xl font-bold text-red-500">{type.group}</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold">
                    {type.group}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Can Give To:</p>
                    <div className="flex flex-wrap gap-2">
                      {type.canGiveTo.map(recipient => (
                        <span 
                          key={recipient}
                          className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm font-medium"
                        >
                          {recipient}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Can Receive From:</p>
                    <div className="flex flex-wrap gap-2">
                      {type.canReceiveFrom.map(donor => (
                        <span 
                          key={donor}
                          className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium"
                        >
                          {donor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent"></div>
        
        {/* Main Content */}
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8"
              >
                <AlertCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Need Blood <br className="hidden sm:block" />
                <span className="text-red-200">Urgently?</span>
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-red-100 max-w-2xl mx-auto"
              >
                Our emergency response team is available 24/7. We ensure quick assistance for all critical situations.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link 
                to="/emergency-blood"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-red-600 rounded-2xl hover:bg-red-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                onClick={() => window.scrollTo(0, 0)}
              >
                <AlertCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Request Emergency Blood</span>
              </Link>
{/*               
              <Link 
                to="/contact"
                className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/50 hover:border-white rounded-2xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
              >
                <Users className="w-6 h-6" />
                <span>Contact Support Team</span>
              </Link> */}
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">Quick Response</h3>
                <p className="text-red-100">Immediate attention to all emergency requests</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">24/7 Available</h3>
                <p className="text-red-100">Round-the-clock emergency support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">Verified Donors</h3>
                <p className="text-red-100">Access to screened blood donors</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Video Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">How Blood Donation Works</h2>
          <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl">
            <video
              controls
              poster="/images/video-thumbnail.jpg"
              className="w-full"
            >
              <source src="/images/donation-process.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </div>
  )
}

// Info Card Component
function InfoCard({ title, description, image, icon, link }) {
  return (
    <Link to={link}>
      <motion.div 
        className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ y: -5 }}
      >
        <div className="aspect-video relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-gray-200">{description}</p>
        </div>
      </motion.div>
    </Link>
  )
}

// Simple Components
function StatCard({ number, label, icon, className }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03, y: -5 }}
      className={`text-center p-8 rounded-2xl shadow-lg backdrop-blur-sm ${className} text-white cursor-pointer`}
    >
      <div className="text-white/90 mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="text-4xl font-bold mb-2">
        {number}
      </div>
      <div className="text-white/90 font-medium tracking-wide">{label}</div>
    </motion.div>
  )
}

// Data
const bloodTypes = [
  {
    group: "A+",
    canGiveTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"]
  },
  {
    group: "O-",
    canGiveTo: ["All Types"],
    canReceiveFrom: ["O-"]
  },
  {
    group: "B+",
    canGiveTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"]
  },
  {
    group: "AB+",
    canGiveTo: ["AB+"],
    canReceiveFrom: ["All Types"]
  }
]
