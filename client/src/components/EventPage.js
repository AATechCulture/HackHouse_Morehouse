import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMockData } from '../contexts/MockDataContext';

export function EventPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { events, addVolunteer, removeVolunteer } = useMockData();
  const [donationAmount, setDonationAmount] = useState('');
  
  const event = events.find(e => e.id === parseInt(id));
  const isVolunteering = event?.volunteers?.some(v => v.userId === user?.id);

  if (!event) return <div>Event not found</div>;

  const progress = (event.currentDonations / event.donationGoal) * 100;

  const handleVolunteer = () => {
    if (isVolunteering) {
      removeVolunteer(event.id, user.id);
    } else {
      addVolunteer(event.id, user);
    }
  };

  const handleDonation = () => {
    const amount = Number(donationAmount);
    if (!amount || amount <= 0) return;

    alert(`Thank you for your donation of $${amount}!`);
    setDonationAmount('');
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Nonprofit Name and Event Title */}
        <div className="mb-8">
          <Link 
            to={`/nonprofit/${event.nonprofitId}`}
            className="text-blue-600 hover:text-blue-800 text-lg"
          >
            {event.nonprofitName}
          </Link>
          <h1 className="text-3xl font-bold mt-2">{event.title}</h1>
          
          {/* Event Date */}
          <div className="mt-4 flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg inline-block">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="font-medium">
              {new Date(event.eventDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Event Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
            <p className="text-gray-700 mb-6">{event.description}</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Donation Progress</h3>
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-600 rounded-full h-4 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-700">
                ${event.currentDonations.toLocaleString()} raised of ${event.donationGoal.toLocaleString()} goal
              </p>
            </div>
          </div>

          {/* Right Column - Donors and Fund Allocation */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Top Donors</h2>
            <div className="space-y-4 mb-8">
              {event.topDonors.map((donor, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </span>
                    <span className="font-semibold">{donor.name}</span>
                  </div>
                  <span className="text-blue-600 font-semibold">
                    ${donor.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              {event.topDonors.length === 0 && (
                <p className="text-gray-500 italic">Be the first to donate!</p>
              )}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Use of Funds</h2>
            <div className="space-y-4">
              {event.useOfFunds.map(item => (
                <div key={item.category} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>{item.category}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {user?.type === 'corporate' && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>
            <div className="flex gap-4">
              <input
                type="number"
                value={donationAmount}
                onChange={e => setDonationAmount(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Enter amount"
                min="1"
              />
              <button
                onClick={handleDonation}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Donate
              </button>
            </div>
          </div>
        )}

        {user?.type === 'individual' && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Get Involved</h3>
            <div className="space-y-4">
              <button
                onClick={handleVolunteer}
                className={`px-6 py-2 rounded transition-colors ${
                  isVolunteering 
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isVolunteering ? 'Cancel Volunteering' : 'Sign Up to Volunteer'}
              </button>
              
              {/* Volunteers List */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Current Volunteers ({event.volunteers?.length || 0})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.volunteers?.length > 0 ? (
                    event.volunteers.map((volunteer) => (
                      <div 
                        key={volunteer.userId} 
                        className={`p-3 rounded-lg ${
                          volunteer.userId === user?.id ? 'bg-blue-50' : 'bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">
                          {volunteer.name}
                          {volunteer.userId === user?.id && ' (You)'}
                        </div>
                        <div className="text-sm text-gray-600">
                          Joined {new Date(volunteer.signupDate).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No volunteers yet. Be the first to sign up!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Updates Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Updates & Milestones</h2>
          <div className="space-y-4">
            {event.updates?.map((update, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                <div className="text-sm text-gray-600">{new Date(update.date).toLocaleDateString()}</div>
                <h3 className="font-semibold">{update.title}</h3>
                <p className="text-gray-700">{update.content}</p>
              </div>
            ))}
            {(!event.updates || event.updates.length === 0) && (
              <p className="text-gray-500 italic">No updates yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}