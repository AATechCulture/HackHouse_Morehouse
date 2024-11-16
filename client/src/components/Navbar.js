import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-white text-xl font-bold">
          Impact Match
        </Link>
        <div className="space-x-4">
          {user.type === 'corporate' && (
            <>
              <Link to="/explore" className="text-white hover:text-blue-200">
                Explore
              </Link>
              <Link to="/chatbot" className="text-white hover:text-blue-200">
                Match Bot
              </Link>
              <Link to="/analytics" className="text-white hover:text-blue-200">
                Analytics
              </Link>
              <Link to="/corporate-profile" className="text-white hover:text-blue-200">
                Company Profile
              </Link>
              <Link to="/chats" className="text-white hover:text-blue-200">
                Chats
              </Link>
            </>
          )}
          
          {user.type === 'nonprofit' && (
            <>
              <Link to="/create-event" className="text-white hover:text-blue-200">
                Create Event
              </Link>
              <Link to="/explore-companies" className="text-white hover:text-blue-200">
                Explore Companies
              </Link>
              <Link to="/nonprofit-profile" className="text-white hover:text-blue-200">
                Profile
              </Link>
              <Link to="/event-metrics" className="text-white hover:text-blue-200">
                Event Metrics
              </Link>
              <Link to="/chats" className="text-white hover:text-blue-200">
                Chats
              </Link>
            </>
          )}
          
          {user.type === 'individual' && (
            <>
              <Link to="/explore" className="text-white hover:text-blue-200">
                Explore
              </Link>
              <Link to="/volunteer-dashboard" className="text-white hover:text-blue-200">
                My Volunteering
              </Link>
            </>
          )}
          
          <button
            onClick={handleLogout}
            className="text-white hover:text-blue-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}