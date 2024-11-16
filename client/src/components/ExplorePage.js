import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMockData } from '../contexts/MockDataContext';

export function ExplorePage() {
  const { events, nonprofits } = useMockData();
  const [view, setView] = useState('events');
  const [filters, setFilters] = useState({
    cause: '',
    location: '',
    organization: ''
  });

  const allTags = [...new Set(events.flatMap(event => event.tags))];
  const allLocations = [...new Set(events.map(event => event.location))];
  const allOrganizations = [...new Set(events.map(event => event.nonprofitName))];

  const filteredEvents = events.filter(event => {
    if (filters.cause && !event.tags.includes(filters.cause)) return false;
    if (filters.location && event.location !== filters.location) return false;
    if (filters.organization && event.nonprofitName !== filters.organization) return false;
    return true;
  });

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Explore</h2>
        
        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView('events')}
            className={`px-4 py-2 rounded-lg ${
              view === 'events' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setView('nonprofits')}
            className={`px-4 py-2 rounded-lg ${
              view === 'nonprofits' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Non-Profits
          </button>
        </div>

        {/* Filters */}
        {view === 'events' && (
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              className="p-2 border rounded"
              value={filters.cause}
              onChange={e => setFilters({...filters, cause: e.target.value})}
            >
              <option value="">All Causes</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select
              className="p-2 border rounded"
              value={filters.location}
              onChange={e => setFilters({...filters, location: e.target.value})}
            >
              <option value="">All Locations</option>
              {allLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              className="p-2 border rounded"
              value={filters.organization}
              onChange={e => setFilters({...filters, organization: e.target.value})}
            >
              <option value="">All Organizations</option>
              {allOrganizations.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {view === 'events' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <Link 
                  to={`/nonprofit/${event.nonprofitId}`}
                  className="text-blue-600 hover:text-blue-800 text-sm block mb-2"
                >
                  {event.nonprofitName}
                </Link>
                
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                
                <div className="mb-3 flex items-center text-gray-600">
                  <svg 
                    className="w-4 h-4 mr-2" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {new Date(event.eventDate).toLocaleDateString()}
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>${event.currentDonations.toLocaleString()}</span>
                    <span>${event.donationGoal.toLocaleString()}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${(event.currentDonations / event.donationGoal) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <Link
                  to={`/event/${event.id}`}
                  className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nonprofits.map(nonprofit => (
            <div key={nonprofit.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{nonprofit.name}</h3>
              <p className="text-gray-600 mb-4">{nonprofit.mission}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {nonprofit.focusAreas.map(area => (
                    <span
                      key={area}
                      className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Link
                  to={`/nonprofit/${nonprofit.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Profile →
                </Link>
                <Link
                  to={`/chat/${nonprofit.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}