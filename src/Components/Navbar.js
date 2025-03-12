import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isVolunteerDropdownOpen, setIsVolunteerDropdownOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  const volunteerLinks = [
    { path: '/register-donor', label: 'Register as Donor' },
    { path: '/register-hospital', label: 'Register as Hospital' },
    { path: '/register-vehicle', label: 'Register as Vehicle' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleRegisterClick = (path) => {
    navigate(path);
    setIsVolunteerDropdownOpen(false);
    setIsOpen(false);
  };

  const handleMobileLinkClick = () => {
    setIsOpen(false);
    setMobileSubmenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg border-b-2 border-red-600' 
        : 'bg-white'
    }`}>
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-base font-medium ${
                isActivePath('/') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/emergency-blood"
              className={`text-base font-medium ${
                isActivePath('/emergency-blood') 
                  ? 'text-red-600' 
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Emergency Blood
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsVolunteerDropdownOpen(!isVolunteerDropdownOpen)}
                className={`text-base font-medium inline-flex items-center ${
                  isActivePath('/volunteer') || isActivePath('/register-donor') 
                    ? 'text-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                Volunteer
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isVolunteerDropdownOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {volunteerLinks.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => handleRegisterClick(link.path)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className={`text-base font-medium ${
                    isActivePath('/login') 
                      ? 'text-red-600' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/hospital-login"
                  className={`text-base font-medium ${
                    isActivePath('/hospital-login') 
                      ? 'text-red-600' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  Hospital Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={handleMobileLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
            >
              Home
            </Link>
            <Link
              to="/emergency-blood"
              onClick={handleMobileLinkClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
            >
              Emergency Blood
            </Link>
            <div>
              <button
                onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
              >
                Volunteer
                <ChevronDown className={`ml-1 h-4 w-4 transform ${mobileSubmenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenuOpen && (
                <div className="pl-4">
                  {volunteerLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => handleRegisterClick(link.path)}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  onClick={handleMobileLinkClick}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
                >
                  Login
                </Link>
                <Link
                  to="/hospital-login"
                  onClick={handleMobileLinkClick}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
                >
                  Hospital Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;