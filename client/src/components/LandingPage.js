import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
    navigate('/login', { state: { userType } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl font-bold mb-6">Impact Match</h1>
          <p className="text-xl mb-8">Connecting Corporations with Non-Profits for Greater Social Impact</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Corporate Card */}
          <div className="bg-white rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">For Corporations</h2>
              <p className="text-gray-600 mb-4">Connect with non-profits that align with your CSR goals</p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li>• Find matching non-profits</li>
                <li>• Track your social impact</li>
                <li>• Engage employees in giving</li>
              </ul>
            </div>
            <button 
              onClick={() => handleUserTypeSelection('corporate')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full"
            >
              Join as Corporate
            </button>
          </div>

          {/* Non-Profit Card */}
          <div className="bg-white rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">For Non-Profits</h2>
              <p className="text-gray-600 mb-4">Share your mission and connect with corporate partners</p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li>• Create fundraising events</li>
                <li>• Track donations and impact</li>
                <li>• Build corporate partnerships</li>
              </ul>
            </div>
            <button 
              onClick={() => handleUserTypeSelection('nonprofit')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full"
            >
              Join as Non-Profit
            </button>
          </div>

          {/* Individual Card */}
          <div className="bg-white rounded-lg p-8 text-center transform hover:scale-105 transition-transform duration-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">For Individuals</h2>
              <p className="text-gray-600 mb-4">Discover volunteer opportunities and make an impact</p>
              <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
                <li>• Find volunteer opportunities</li>
                <li>• Track your contributions</li>
                <li>• Connect with causes you care about</li>
              </ul>
            </div>
            <button 
              onClick={() => handleUserTypeSelection('individual')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full"
            >
              Join as Individual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}