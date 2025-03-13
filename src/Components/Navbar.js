import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isVolunteerDropdownOpen, setIsVolunteerDropdownOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

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

  const handleHospitalClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/hospital-login');
    } else {
      navigate('/emergency-blood');
    }
    setIsOpen(false);
    setIsVolunteerDropdownOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const volunteerLinks = [
    { name: "Volunteer", path: "/Volunteer" },
    { name: "NGO's", path: "/ngo-registration" },
    { name: "Volunteer Vehicle", path: "/register-vehicle" },
    { name: "Hospital/Organization", path: "#", onClick: handleHospitalClick },
  ];

  const handleMobileSubmenuClick = () => {
    setMobileSubmenuOpen(!mobileSubmenuOpen);
  };

  const handleMobileLinkClick = (link) => {
    if (link.onClick) {
      link.onClick();
    }
    setIsOpen(false);
    setMobileSubmenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b-2 border-red-600' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img 
                src="/images/logo1.png"
                alt="Blood Donation Logo" 
                className="h-20 mt-5 sm:h-24 md:h-24 lg:h-36 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-4 lg:space-x-8">
              <Link 
                to="/"
                className={`group px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 ${
                  isActivePath('/') 
                    ? 'text-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                <span className="relative">
                  Home
                  <span className="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100 bg-red-600" />
                </span>
              </Link>
              <Link 
                to="/emergency-blood"
                className={`group px-4 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActivePath('/emergency-blood') 
                    ? 'text-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                <span className="relative">
                  Emergency Blood
                  <span className="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100 bg-red-600" />
                </span>
              </Link>
              <div className="relative group">
                <button 
                  className={`group px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 inline-flex items-center ${
                    isActivePath('/volunteer') || isActivePath('/ngo-registration') || 
                    isActivePath('/vehicle-registration') || isActivePath('/hospital-registration')
                      ? 'text-red-600' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                  onMouseEnter={() => setIsVolunteerDropdownOpen(true)}
                  onMouseLeave={() => setIsVolunteerDropdownOpen(false)}
                >
                  <span className="relative">
                    Volunteer Services
                    <span className="absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform group-hover:scale-x-100 bg-red-600" />
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                <div 
                  className={`absolute left-0 mt-2 w-56 sm:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                    isVolunteerDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseEnter={() => setIsVolunteerDropdownOpen(true)}
                  onMouseLeave={() => setIsVolunteerDropdownOpen(false)}
                >
                  <div className="py-1">
                    {volunteerLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={link.onClick}
                        className={`block px-4 py-2.5 text-sm sm:text-base ${
                          isActivePath(link.path)
                            ? 'text-red-600 bg-red-50'
                            : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                        } transition-colors`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2 lg:space-x-4">
                <Link 
                  to="/login"
                  className="px-4 lg:px-6 py-2 rounded-lg border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 text-sm lg:text-base font-medium whitespace-nowrap"
                >
                  Login
                </Link>
                <button 
                  onClick={handleRegisterClick}
                  className="px-4 lg:px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-300 text-sm lg:text-base font-medium border-2 border-transparent hover:border-red-700 whitespace-nowrap"
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
              className="p-2 rounded-md transition-colors text-red-600 hover:bg-red-50"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-4 pt-2 pb-3 space-y-2 bg-white shadow-lg">
          <Link
            to="/"
            className={`block px-4 py-2.5 rounded-md text-base font-medium ${
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
            className={`block px-4 py-2.5 rounded-md text-base font-medium ${
              isActivePath('/emergency-blood') 
                ? 'text-red-600 bg-red-50 border-l-4 border-red-600' 
                : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Emergency Blood
          </Link>

          {/* Mobile Volunteer Services Dropdown */}
          <div className="relative">
            <button
              onClick={handleMobileSubmenuClick}
              className={`w-full flex justify-between items-center px-4 py-2.5 rounded-md text-base font-medium ${
                isActivePath('/volunteer') || isActivePath('/ngo-registration') || 
                isActivePath('/register-vehicle') || isActivePath('/hospital-login')
                  ? 'text-red-600 bg-red-50 border-l-4 border-red-600' 
                  : 'text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-l-4 hover:border-red-600'
              }`}
            >
              <span>Volunteer Services</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-200 ${
                  mobileSubmenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <motion.div
              initial={false}
              animate={{
                height: mobileSubmenuOpen ? 'auto' : 0,
                opacity: mobileSubmenuOpen ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-gray-50"
            >
              {volunteerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleMobileLinkClick(link)}
                  className={`block px-8 py-2.5 text-sm font-medium border-l-4 ${
                    isActivePath(link.path)
                      ? 'text-red-600 bg-red-50 border-red-600' 
                      : 'text-gray-600 border-transparent hover:text-red-600 hover:bg-red-50 hover:border-red-600'
                  } transition-all duration-200`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="space-y-2 pt-2">
            <Link
              to="/login"
              className="block w-full px-4 py-2.5 rounded-md text-base font-medium text-red-600 border-2 border-red-600 hover:bg-red-50 text-center"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <button
              onClick={handleRegisterClick}
              className="w-full px-4 py-2.5 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 border-2 border-transparent hover:border-red-700"
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