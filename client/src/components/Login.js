import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { sampleLogins } from '../contexts/MockDataContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const userType = location.state?.userType || 'individual';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleQuickLogin = (sampleUser) => {
    const userData = {
      id: sampleUser.id,
      email: sampleUser.email,
      name: sampleUser.name,
      type: userType,
      volunteerEvents: sampleUser.volunteerEvents
    };

    login(userData);

    if (userType === 'corporate') {
      navigate('/explore');
    } else if (userType === 'nonprofit') {
      navigate('/nonprofit-profile');
    } else {
      navigate('/volunteer-dashboard');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const sampleUsers = sampleLogins[userType];
    const matchingUser = sampleUsers.find(user => user.email === formData.email);

    if (matchingUser) {
      handleQuickLogin(matchingUser);
    } else {
      alert('Please use one of the sample accounts listed below.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in as {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>

        <div className="mt-8">
          <div className="text-sm text-gray-600 mb-4">Sample Accounts:</div>
          <div className="space-y-2">
            {sampleLogins[userType].map(account => (
              <button
                key={account.email}
                onClick={() => handleQuickLogin(account)}
                className="w-full text-left p-2 text-sm hover:bg-gray-50 rounded"
              >
                <div className="font-medium">{account.name}</div>
                <div className="text-gray-500">{account.email}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}