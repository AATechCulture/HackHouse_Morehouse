import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

export function EventMetrics() {
  const { user } = useAuth();
  const { state } = useApp();

  const nonprofitEvents = state.events.filter(event => event.nonprofitId === user.id);

  const totalDonations = nonprofitEvents.reduce((sum, event) => sum + event.currentDonations, 0);
  const averageDonation = totalDonations / nonprofitEvents.length || 0;

  const monthlyData = nonprofitEvents.reduce((acc, event) => {
    const month = new Date(event.createdAt).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + event.currentDonations;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount
  }));

  const eventData = nonprofitEvents.map(event => ({
    name: event.title,
    donations: event.currentDonations,
    goal: event.donationGoal,
    progress: (event.currentDonations / event.donationGoal) * 100
  }));

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8">Event Metrics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Total Events</h3>
          <p className="text-3xl font-bold">{nonprofitEvents.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Total Donations</h3>
          <p className="text-3xl font-bold">${totalDonations.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-600">Average Donation</h3>
          <p className="text-3xl font-bold">${averageDonation.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Monthly Donations</h3>
          <LineChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#3B82F6" />
          </LineChart>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Event Progress</h3>
          <BarChart width={500} height={300} data={eventData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="donations" fill="#3B82F6" name="Current Donations" />
            <Bar dataKey="goal" fill="#9CA3AF" name="Goal" />
          </BarChart>
        </div>
      </div>

      {/* Events List */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold p-6 border-b">All Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Event</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Goal</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Current</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {eventData.map((event, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${event.goal.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${event.donations.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${event.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600">{event.progress.toFixed(1)}%</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}