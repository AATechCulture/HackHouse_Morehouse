import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMockData } from '../contexts/MockDataContext';

export function NonprofitProfile() {
  const { id } = useParams();
  const { nonprofits, events } = useMockData();
  
  const nonprofit = nonprofits.find(n => n.id === parseInt(id));
  const nonprofitEvents = events.filter(event => event.nonprofitId === parseInt(id));

  if (!nonprofit) return <div>Nonprofit not found</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-4">{nonprofit.name}</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-700">{nonprofit.mission}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Impact Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">
                {nonprofit.impact.peopleHelped?.toLocaleString() || 0}
              </p>
              <p className="text-gray-600">People Helped</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">
                {nonprofit.impact.programsLaunched || 0}
              </p>
              <p className="text-gray-600">Programs Launched</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">
                {nonprofit.impact.communitiesServed || 0}
              </p>
              <p className="text-gray-600">Communities Served</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Focus Areas</h2>
          <div className="flex flex-wrap gap-2">
            {nonprofit.focusAreas.map(area => (
              <span
                key={area}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Current Events</h2>
            <Link
              to={`/chat/${nonprofit.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Chat with Us
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nonprofitEvents.map(event => (
              <div key={event.id} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  {new Date(event.eventDate).toLocaleDateString()}
                </div>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Progress</div>
                    <div className="font-semibold">
                      ${event.currentDonations.toLocaleString()} of ${event.donationGoal.toLocaleString()}
                    </div>
                  </div>
                  <Link
                    to={`/event/${event.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
            {nonprofitEvents.length === 0 && (
              <p className="text-gray-500 italic">No active events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}