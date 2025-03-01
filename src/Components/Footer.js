import { PhoneCall, Mail, MapPin, Heart } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative">
      {/* Red accent line at top */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500"></div>
      
      <div className="container px-4 md:px-6 py-16 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src="/images/logo1.png" 
                alt="Blood Donation Logo" 
                className="h-20 w-auto brightness-0 invert hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              We're dedicated to connecting blood donors with those in need, making blood donation 
              accessible and efficient for everyone.
            </p>
            <div className="pt-4">
              <span className="text-red-500 font-semibold">Emergency Helpline:</span>
              <div className="text-white text-xl font-bold mt-1">1800-123-4567</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-red-600"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/volunteer" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="border-b border-transparent hover:border-red-500">Donate Blood</span>
                </Link>
              </li>
              <li>
                <Link to="/emergency-blood" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="border-b border-transparent hover:border-red-500">Emergency Blood</span>
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="border-b border-transparent hover:border-red-500">Eligibility</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="border-b border-transparent hover:border-red-500">About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-red-600"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="border-b border-transparent hover:border-red-500">Blog</span>
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="border-b border-transparent hover:border-red-500">FAQs</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="border-b border-transparent hover:border-red-500">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  <span className="border-b border-transparent hover:border-red-500">Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-red-600"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/10 to-red-600/10 flex items-center justify-center group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300">
                  <PhoneCall className="h-5 w-5 text-red-500" />
                </div>
                <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">+1 234 567 890</span>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/10 to-red-600/10 flex items-center justify-center group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300">
                  <Mail className="h-5 w-5 text-red-500" />
                </div>
                <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">contact@blooddonation.com</span>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/10 to-red-600/10 flex items-center justify-center group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">Developed by Iinsaf Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 Blood Donation Platform. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="https://linkedin.com/company/blood-donation" target="_blank" rel="noopener noreferrer" 
                className="transform hover:scale-110 transition-transform duration-300">
                <img 
                  src="/images/linkedin.png" 
                  alt="LinkedIn" 
                  className="w-8 h-8"
                />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-300">
                <img 
                  src="/images/twitter.png" 
                  alt="Twitter" 
                  className="w-8 h-8"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-300">
                <img 
                  src="/images/instagram.png" 
                  alt="Instagram" 
                  className="w-8 h-8"
                />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-300">
                <img 
                  src="/images/youtube.png" 
                  alt="YouTube" 
                  className="w-8 h-8"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 