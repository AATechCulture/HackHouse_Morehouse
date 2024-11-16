import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export function EventPage() {
  const { id } = useParams();
  const { state } = useApp();
  const event = state.events.find(e => e.id === parseInt(id)) || {
    title: "Back to School Drive 2024",
    description: "Help us provide school supplies to underprivileged students",
    tags: ["Education", "Community", "Youth"],
    donationGoal: 10000,
    currentDonations: 7500,
    topDonors: [
      { name: "John Doe", amount: 2000 },
      { name: "Jane Smith", amount: 1500 },
      { name: "Bob Wilson", amount: 1000 }
    ],
    useOfFunds: [
      { category: "School Supplies", percentage: 60 },
      { category: "Transportation", percentage: 25 },
      { category: "Administrative", percentage: 15 }
    ],
    updates: [
      {
        date: "2024-03-15",
        title: "Halfway there!",
        content: "We've reached 50% of our donation goal!"
      }
    ]
  };

  const progress = (event.currentDonations / event.donationGoal) * 100;

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
            <p className="text-gray-700 mb-6">{event.description}</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
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
                  className="bg-blue-600 rounded-full h-4"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-700">
                ${event.currentDonations.toLocaleString()} raised of $
                {event.donationGoal.toLocaleString()} goal
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Top Donors</h2>
            <div className="space-y-4 mb-8">
              {event.topDonors.map((donor, index) => (
                <div key={index} className="flex justify-between items-center">
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

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Updates & Milestones</h2>
          <div className="space-y-4">
            {event.updates.map((update, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <div className="text-sm text-gray-600">{update.date}</div>
                <h3 className="font-semibold">{update.title}</h3>
                <p className="text-gray-700">{update.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}