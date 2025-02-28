import { Heart, Users, Calendar, Award, CheckCircle } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { AnimatedSection, fadeIn, slideIn, staggerContainer } from "./Animation"
import { toast } from 'react-hot-toast'

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "",
    interests: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Application submitted successfully!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        availability: "",
        interests: []
      })
    } catch (error) {
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-red-600 text-white"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/volunteer-bg.jpg"
            alt="Volunteers"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Volunteer Community
            </h1>
            <p className="text-xl mb-8">
              Make a difference in your community by volunteering with us. Help save lives
              and support our blood donation initiatives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-red-600 px-8 py-3 rounded-full font-medium hover:bg-red-50 transition-colors">
                Apply Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-red-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <AnimatedSection className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Volunteer With Us?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <BenefitCard
              icon={<Heart className="w-8 h-8 text-red-500" />}
              title="Make an Impact"
              description="Help save lives and make a real difference in your community"
            />
            <BenefitCard
              icon={<Users className="w-8 h-8 text-red-500" />}
              title="Meet New People"
              description="Connect with like-minded individuals who share your passion"
            />
            <BenefitCard
              icon={<Calendar className="w-8 h-8 text-red-500" />}
              title="Flexible Schedule"
              description="Choose volunteer opportunities that fit your availability"
            />
            <BenefitCard
              icon={<Award className="w-8 h-8 text-red-500" />}
              title="Gain Experience"
              description="Develop new skills and enhance your resume"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Volunteer Form */}
      <AnimatedSection className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Volunteer Application</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Availability</label>
                <select 
                  className="w-full p-3 border rounded-lg"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                >
                  <option value="">Select your availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Areas of Interest</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked={formData.interests.includes("Blood Drive Support")} onChange={() => handleInterestChange("Blood Drive Support")} />
                    Blood Drive Support
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked={formData.interests.includes("Administrative Support")} onChange={() => handleInterestChange("Administrative Support")} />
                    Administrative Support
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked={formData.interests.includes("Community Outreach")} onChange={() => handleInterestChange("Community Outreach")} />
                    Community Outreach
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked={formData.interests.includes("Event Planning")} onChange={() => handleInterestChange("Event Planning")} />
                    Event Planning
                  </label>
                </div>
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
                    Submitting...
                  </span>
                ) : "Submit Application"}
              </motion.button>
            </form>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-16 bg-gray-100">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Volunteer Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {volunteerTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="text-center p-6">
      <div className="inline-block p-3 bg-red-50 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function TestimonialCard({ image, name, role, quote }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
      />
      <blockquote className="text-gray-600 italic mb-4">{quote}</blockquote>
      <div className="text-center">
        <h4 className="font-bold">{name}</h4>
        <p className="text-gray-500">{role}</p>
      </div>
    </div>
  )
}

const volunteerTestimonials = [
  {
    image: "/images/volunteers/volunteer1.jpg",
    name: "Sarah Johnson",
    role: "Blood Drive Coordinator",
    quote: "Volunteering here has been incredibly rewarding. I've met amazing people and helped save countless lives."
  },
  {
    image: "/images/volunteers/volunteer2.jpg",
    name: "Michael Chen",
    role: "Community Outreach",
    quote: "Being able to educate others about blood donation and its importance has been a fantastic experience."
  },
  {
    image: "/images/volunteers/volunteer3.jpg",
    name: "Emily Rodriguez",
    role: "Event Planner",
    quote: "I love organizing blood drives and seeing the direct impact we have on our community."
  }
] 