import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Impact Match
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">
            Profile
          </Link>
          <Link to="/explore" className="text-white hover:text-blue-200">
            Explore
          </Link>
          <Link to="/create-event" className="text-white hover:text-blue-200">
            Create Event
          </Link>
          <Link to="/chatbot" className="text-white hover:text-blue-200">
            Match Bot
          </Link>
          <Link to="/analytics" className="text-white hover:text-blue-200">
            Analytics
          </Link>
        </div>
      </div>
    </nav>
  );
}
