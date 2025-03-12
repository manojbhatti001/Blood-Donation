import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ListChecks,
  Clock, 
  History,
  User,
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/dashboard'); // Navigate to dashboard home instead of root
    }
  };

  const dashboardOptions = [
    {
      label: 'Donor Dashboard',
      path: '/dashboard',
      description: 'Manage your blood donations'
    },
    {
      label: 'Requester Dashboard',
      path: '/requester-dashboard',
      description: 'Manage your blood requests'
    }
  ];

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      isDropdown: true,
      options: dashboardOptions,
      description: 'Switch between dashboards'
    },
    {
      icon: Home,
      label: 'Available Requests',
      path: '/dashboard/available',
      description: 'View nearby blood requests'
    },
    {
      icon: ListChecks,
      label: 'Accepted Requests',
      path: '/dashboard/accepted',
      description: 'Manage your accepted donations'
    },
    {
      icon: History,
      label: 'Donation History',
      path: '/dashboard/history',
      description: 'View your past donations'
    },
    {
      icon: User,
      label: 'Profile Settings',
      path: '/dashboard/profile',
      description: 'Manage your account'
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  const renderMenuItem = (item) => {
    if (item.isDropdown) {
      return (
        <div className="relative" key={item.label}>
          <button
            onClick={() => setIsDashboardDropdownOpen(!isDashboardDropdownOpen)}
            className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-300 group ${
              isActivePath('/dashboard') || isActivePath('/requester-dashboard')
                ? 'bg-red-50 text-red-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${
              isActivePath('/dashboard') || isActivePath('/requester-dashboard')
                ? 'text-red-600'
                : 'text-gray-500'
            }`} />
            {isOpen && (
              <div className="ml-3 flex-1 flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isDashboardDropdownOpen ? 'rotate-180' : ''
                }`} />
              </div>
            )}
          </button>
          
          {isDashboardDropdownOpen && isOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-10">
              {item.options.map((option) => (
                <Link
                  key={option.path}
                  to={option.path}
                  onClick={() => setIsDashboardDropdownOpen(false)}
                  className={`block px-4 py-2 text-sm hover:bg-red-50 ${
                    isActivePath(option.path)
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center px-3 py-3 rounded-lg transition-all duration-300 group ${
          isActivePath(item.path)
            ? 'bg-red-50 text-red-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <item.icon className={`w-5 h-5 ${
          isActivePath(item.path) ? 'text-red-600' : 'text-gray-500'
        }`} />
        {isOpen && (
          <div className="ml-3">
            <p className="font-medium">{item.label}</p>
            <p className="text-xs text-gray-500">{item.description}</p>
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: isOpen ? 240 : 80 }}
        animate={{ width: isOpen ? 240 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col bg-white border-r border-gray-200 shadow-lg"
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-4">
          <motion.img
            initial={{ width: isOpen ? 150 : 40 }}
            animate={{ width: isOpen ? 150 : 40 }}
            transition={{ duration: 0.3 }}
            src="/images/logo1.png"
            alt="Logo"
            className="object-contain"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ChevronRight
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* User Info */}
        {isOpen && (
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{currentUser?.name || 'User Name'}</p>
            <p className="text-xs text-gray-500">{currentUser?.email || 'user@example.com'}</p>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map(renderMenuItem)}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl md:hidden"
            >
              <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200">
                <img src="/images/logo1.png" alt="Logo" className="h-8" />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name || 'User Name'}</p>
                <p className="text-xs text-gray-500">{currentUser?.email || 'user@example.com'}</p>
              </div>

              <nav className="px-2 py-4 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path || item.label}
                    to={item.path || '#'}
                    onClick={() => {
                      if (item.isDropdown) {
                        setIsDashboardDropdownOpen(!isDashboardDropdownOpen);
                      } else {
                        setIsMobileOpen(false);
                      }
                    }}
                    className={`flex items-center px-3 py-3 rounded-lg ${
                      isActivePath(item.path)
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="ml-3">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="ml-3 font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-20 p-2 bg-white rounded-lg shadow-lg md:hidden"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;