import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

export function CreateEventForm() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    donationGoal: 0,
    useOfFunds: [],
    milestones: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      currentDonations: 0,
      topDonors: [],
      updates: []
    };
    dispatch({ type: 'ADD_EVENT', payload: newEvent });
    navigate(`/event/${newEvent.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Add tags separated by commas"
            onChange={e => setFormData({
              ...formData,
              tags: e.target.value.split(',').map(tag => tag.trim())
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Donation Goal</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={formData.donationGoal}
            onChange={e => setFormData({...formData, donationGoal: Number(e.target.value)})}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}