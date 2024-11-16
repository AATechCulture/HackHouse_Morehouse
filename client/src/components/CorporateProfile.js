import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function CorporateProfile() {
  const { user } = useAuth();
  
  // mock data
  const contributions = [
    {
      id: 1,
      nonprofitName: "Education First",
      eventTitle: "Back to School Drive 2024",
      amount: 50000,
      date: "2024-03-15",
      type: "Monetary"
    },
  ];

  const partnerships = [
    {
      id: 1,
      nonprofitName: "Education First",
      duration: "1 year",
      focus: "Education",
      impact: "Helped 1000+ students"
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6">{user.name}</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Contributions</h2>
          <div className="grid gap-4">
            {contributions.map(contribution => (
              <div key={contribution.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Link 
                      to={`/nonprofit/${contribution.id}`}
                      className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                    >
                      {contribution.nonprofitName}
                    </Link>
                    <p className="text-gray-600">{contribution.eventTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${contribution.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{contribution.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Active Partnerships</h2>
          <div className="grid gap-4">
            {partnerships.map(partnership => (
              <div key={partnership.id} className="border rounded-lg p-4">
                <Link 
                  to={`/nonprofit/${partnership.id}`}
                  className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                >
                  {partnership.nonprofitName}
                </Link>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{partnership.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Focus Area</p>
                    <p className="font-semibold">{partnership.focus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Impact</p>
                    <p className="font-semibold">{partnership.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}