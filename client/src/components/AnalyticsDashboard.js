import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export function AnalyticsDashboard() {
  const data = [
    { month: 'Jan', donations: 4000, impact: 2400 },
    { month: 'Feb', donations: 3000, impact: 1398 },
    { month: 'Mar', donations: 2000, impact: 9800 },
    { month: 'Apr', donations: 2780, impact: 3908 },
    { month: 'May', donations: 1890, impact: 4800 },
    { month: 'Jun', donations: 2390, impact: 3800 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Contribution Trends</h3>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="donations"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="impact" stroke="#82ca9d" />
          </LineChart>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Impact Summary</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Total Donations</h4>
              <p className="text-3xl font-bold text-blue-600">$24,780</p>
            </div>
            <div>
              <h4 className="font-medium">Projects Supported</h4>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div>
              <h4 className="font-medium">Volunteer Hours</h4>
              <p className="text-3xl font-bold text-purple-600">456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}