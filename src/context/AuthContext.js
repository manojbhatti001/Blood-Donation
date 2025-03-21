import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
      }
    }
    setLoading(false);
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      let endpoint = '/auth/register';
      if (userData.userType === 'hospital' || userData.userType === 'ngo') {
        endpoint = '/auth/register/organization';
      } else {
        endpoint = '/auth/register/individual';
      }

      const response = await api.post(endpoint, userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', response.data.user.userType);
        setUser(response.data.user);
        toast.success('Registration successful!');
        navigateToUserDashboard(response.data.user.userType);
      }
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Registration failed';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', response.data.user.userType);
        setUser(response.data.user);
        toast.success('Login successful!');
        navigateToUserDashboard(response.data.user.userType);
      }
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Login failed';
      toast.error(errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navigateToUserDashboard = (userType) => {
    switch (userType) {
      case 'donor':
        navigate('/donor-dashboard');
        break;
      case 'hospital':
      case 'ngo':
        navigate('/organization-dashboard');
        break;
      case 'individual':
        navigate('/requester-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      register,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
