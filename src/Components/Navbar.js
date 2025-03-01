import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegisterClick = () => {
    navigate('/register');
    setIsOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b-4 border-red-600' 
          : 'bg-red-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                src="/images/logo1.png"
                alt="Blood Donation Logo" 
                className={`h-30 w-40 mt-10 transition-all duration-300 group-hover:scale-110 ${
                  isScrolled ? 'brightness-0' : 'brightness-0'
                }`}
                style={{ 
                  filter: isScrolled ? 'none' : 'drop-shadow(0 0 4px rgba(255,255,255,0.5))'
                }}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8">
              <Link 
                to="/"
                className={`group px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActivePath('/') 
                    ? isScrolled ? 'text-red-600' : 'text-white' 
                    : isScrolled 
                      ? 'text-gray-700 hover:text-red-600' 
                      : 'text-white hover:text-red-200'
                }`}
              >
                <span className="relative">
                  Home
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    isScrolled ? 'bg-red-600' : 'bg-white'
                  }`} />
                </span>
              </Link>
              <Link 
                to="/emergency-blood"
                className={`group px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActivePath('/emergency-blood') 
                    ? isScrolled ? 'text-red-600' : 'text-white'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-red-600' 
                      : 'text-white hover:text-red-200'
                }`}
              >
                <span className="relative">
                  Emergency Blood
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    isScrolled ? 'bg-red-600' : 'bg-white'
                  }`} />
                </span>
              </Link>
              <Link 
                to="/volunteer"
                className={`group px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActivePath('/volunteer') 
                    ? isScrolled ? 'text-red-600' : 'text-white'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-red-600' 
                      : 'text-white hover:text-red-200'
                }`}
              >
                <span className="relative">
                  Volunteer
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100 ${
                    isScrolled ? 'bg-red-600' : 'bg-white'
                  }`} />
                </span>
              </Link>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className={`px-6 py-2.5 rounded-lg border-2 transition-all duration-300 text-base font-medium ${
                    isScrolled
                      ? 'text-red-600 border-red-600 hover:bg-red-50'
                      : 'text-white border-white hover:bg-white/10'
                  }`}
                >
                  Login
                </Link>
                <button 
                  onClick={handleRegisterClick}
                  className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors border-2 border-transparent hover:border-red-700 text-base font-medium"
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {isOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg border-t-2 border-red-600">
          <Link
            to="/"
            className={`block px-4 py-3 rounded-md text-lg font-medium ${
              isActivePath('/') 
                ? 'text-red-600 bg-red-50 border-l-4 border-red-600' 
                : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/emergency-blood"
            className={`block px-4 py-3 rounded-md text-lg font-medium ${
              isActivePath('/emergency-blood') 
                ? 'text-red-600 bg-red-50 border-l-4 border-red-600' 
                : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Emergency Blood
          </Link>
          <Link
            to="/volunteer"
            className={`block px-4 py-3 rounded-md text-lg font-medium ${
              isActivePath('/volunteer') 
                ? 'text-red-600 bg-red-50 border-l-4 border-red-600' 
                : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Volunteer
          </Link>

          {/* Mobile Auth Buttons */}
          <div className="space-y-2 pt-2">
            <Link
              to="/login"
              className="block px-4 py-3 rounded-md text-lg font-medium text-red-600 border-2 border-red-600 hover:bg-red-50 text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <button
              onClick={handleRegisterClick}
              className="w-full px-4 py-3 rounded-md text-lg font-medium bg-red-600 text-white hover:bg-red-700 border-2 border-transparent hover:border-red-700"
            >
              Register
            </button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;