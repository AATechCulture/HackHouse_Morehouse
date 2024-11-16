// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const userType = location.state?.userType || 'individual';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Sample accounts for demo
  const sampleAccounts = {
    corporate: 'corporate@demo.com',
    nonprofit: 'nonprofit@demo.com',
    individual: 'individual@demo.com'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock user data based on type
    const userData = {
      id: Date.now(),
      email: formData.email,
      type: userType,
      name: userType === 'corporate' ? 'Tech Corp' : 
            userType === 'nonprofit' ? 'Education First' : 
            'John Doe'
    };

    login(userData);

    // Redirect to dashboard
    navigate('/dashboard');
  };

  const handleQuickLogin = () => {
    setFormData({
      email: sampleAccounts[userType],
      password: 'demo123'
    });
    
    // Automatically submit the form after setting the demo credentials
    const userData = {
      id: Date.now(),
      email: sampleAccounts[userType],
      type: userType,
      name: userType === 'corporate' ? 'Tech Corp' : 
            userType === 'nonprofit' ? 'Education First' : 
            'John Doe'
    };
    
    login(userData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome to Impact Match
          </h2>
          <p className="mt-2 text-gray-600">
            Sign in as {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter any password for demo"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Quick Access</span>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleQuickLogin}
              className="w-full flex justify-center py-2 px-4 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Use Demo Account
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Demo Credentials:</p>
            <p>Email: {sampleAccounts[userType]}</p>
            <p>Password: Any password will work</p>
          </div>
        </div>
      </div>
    </div>
  );
}