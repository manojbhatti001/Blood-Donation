import { PhoneCall, Mail, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 md:px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About Us</h3>
            <p className="text-gray-300">
              We're dedicated to connecting blood donors with those in need, making blood donation 
              accessible and efficient for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/donate" className="text-gray-300 hover:text-white">Donate Blood</Link></li>
              <li><Link to="/find" className="text-gray-300 hover:text-white">Find Blood</Link></li>
              <li><Link to="/eligibility" className="text-gray-300 hover:text-white">Eligibility</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link to="/faqs" className="text-gray-300 hover:text-white">FAQs</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <PhoneCall className="h-5 w-5 mr-2" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@blooddonation.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Developed by Iinsaf Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 Blood Donation Platform. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 