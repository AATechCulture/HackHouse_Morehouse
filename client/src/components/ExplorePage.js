import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export function ExplorePage() {
  const { state } = useApp();
  const [filters, setFilters] = useState({
    cause: '',
    location: '',
    donationType: ''
  });

  const filteredEvents = state.events.filter(event => {
    if (filters.cause && !event.tags.includes(filters.cause)) return false;
    return true;
  });

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Explore Events</h2>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by cause..."
            className="p-2 border rounded"
            onChange={e => setFilters({...filters, cause: e.target.value})}
          />
          <input
            type="text"
            placeholder="Location..."
            className="p-2 border rounded"
            onChange={e => setFilters({...filters, location: e.target.value})}
          />
          <select
            className="p-2 border rounded"
            onChange={e => setFilters({...filters, donationType: e.target.value})}
          >
            <option value="">All Donation Types</option>
            <option value="monetary">Monetary</option>
            <option value="volunteer">Volunteer</option>
            <option value="inkind">In-Kind</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
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
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm text-gray-600">Donation Goal</p>
                <p className="font-semibold">${event.donationGoal?.toLocaleString()}</p>
              </div>
              <Link
                to={`/event/${event.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No events found matching your filters.</p>
        </div>
      )}
    </div>
  );
}