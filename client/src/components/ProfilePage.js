import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export function ProfilePage() {
  const { state } = useApp();
  const nonprofit = {
    name: "Education First",
    mission: "Empowering communities through education",
    impact: {
      studentsHelped: 1200,
      programsLaunched: 15,
      communitiesServed: 25
    },
    testimonials: [
      {
        id: 1,
        text: "This organization has made a tremendous impact in our community.",
        author: "John Smith",
        role: "Community Leader"
      }
    ]
  };

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
                {nonprofit.impact.studentsHelped}
              </p>
              <p className="text-gray-600">Students Helped</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">
                {nonprofit.impact.programsLaunched}
              </p>
              <p className="text-gray-600">Programs Launched</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">
                {nonprofit.impact.communitiesServed}
              </p>
              <p className="text-gray-600">Communities Served</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nonprofit.testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Current Events</h2>
          <Link
            to="/create-event"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block mb-4"
          >
            Create New Event
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {state.events.map(event => (
              <div key={event.id} className="border rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <Link
                  to={`/event/${event.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
