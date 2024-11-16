import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMockData } from '../contexts/MockDataContext';

export function MyVolunteering() {
  const { user } = useAuth();
  const { events } = useMockData();

  const myEvents = events.filter(event => 
    event.volunteers?.some(v => v.userId === user.id)
  );

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">My Volunteering</h2>
      
      {myEvents.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-600 mb-4">You haven't signed up for any volunteer opportunities yet.</p>
          <Link
            to="/explore"
            className="text-blue-600 hover:text-blue-800 inline-block"
          >
            Browse Volunteer Opportunities →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {myEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <Link
                    to={`/nonprofit/${event.nonprofitId}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {event.nonprofitName}
                  </Link>
                  <h3 className="text-xl font-semibold mt-1">{event.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Event Date</div>
                  <div>{new Date(event.eventDate).toLocaleDateString()}</div>
                </div>
              </div>
              
              <p className="text-gray-700 my-4">{event.description}</p>
              
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

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{event.volunteers?.length || 0}</span> volunteers signed up
                </div>
                <Link
                  to={`/event/${event.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Event Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}