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
                src="/images/hero-placeholder.jpg"
                alt=""
                className="w-full h-full object-cover opacity-50"
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
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container px-4 mx-auto text-center relative z-10 text-white">
          <img src="/images/logo.png" alt="Blood Donation Logo" className="w-24 h-24 mx-auto mb-8" />
          <h1 className="text-5xl font-bold mb-6">
            Every Drop <span className="text-red-500">Saves Lives</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
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
              image="/images/learn-donation.jpg"
              icon={<BookOpen className="w-6 h-6" />}
              link="/learn"
            />
            <InfoCard
              title="Eligibility Requirements"
              description="Check if you're eligible to donate blood"
              image="/images/eligibility.jpg"
              icon={<Info className="w-6 h-6" />}
              link="/eligibility"
            />
            <InfoCard
              title="Impact Stories"
              description="Read stories from donors and recipients"
              image="/images/stories.jpg"
              icon={<Activity className="w-6 h-6" />}
              link="/stories"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard number="10,000+" label="Active Donors" icon={<Users />} />
            <StatCard number="15,000+" label="Lives Saved" icon={<Heart />} />
            <StatCard number="1,000+" label="Monthly Donations" icon={<Calendar />} />
            <StatCard number="24/7" label="Emergency Support" icon={<AlertCircle />} />
          </div>
        </div>
      </section>

      {/* Blood Types */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Blood Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bloodTypes.map(type => (
              <div key={type.group} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold text-red-600 mb-4">{type.group}</h3>
                <p className="text-sm text-gray-600">Can Give To:</p>
                <p className="mb-2">{type.canGiveTo.join(", ")}</p>
                <p className="text-sm text-gray-600">Can Receive From:</p>
                <p>{type.canReceiveFrom.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need Blood Urgently?</h2>
          <p className="mb-8">Our emergency team is available 24/7</p>
          <Link 
            to="/emergency-blood"
            className="px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100"
          >
            Request Emergency Blood
          </Link>
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
function StatCard({ number, label, icon }) {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow">
      <div className="text-red-600 mb-2">{icon}</div>
      <div className="text-2xl font-bold mb-1">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
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
