import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

export function CreateEventForm() {
  const { dispatch } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [useOfFunds, setUseOfFunds] = useState([
    { category: '', percentage: 0 }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    donationGoal: 0,
    currentDonations: 0,
    nonprofitName: user.name,
    eventDate: '', 
    volunteers: [],
    topDonors: [],
    updates: []
  });

  const handleUseOfFundsChange = (index, field, value) => {
    const newUseOfFunds = [...useOfFunds];
    newUseOfFunds[index][field] = field === 'percentage' ? Number(value) : value;
    setUseOfFunds(newUseOfFunds);
  };

  const addUseOfFundsCategory = () => {
    setUseOfFunds([...useOfFunds, { category: '', percentage: 0 }]);
  };

  const removeUseOfFundsCategory = (index) => {
    setUseOfFunds(useOfFunds.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const totalPercentage = useOfFunds.reduce((sum, { percentage }) => sum + percentage, 0);
    if (totalPercentage !== 100) {
      alert('Use of funds percentages must sum to 100%');
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...formData,
      useOfFunds,
      createdAt: new Date().toISOString(),
      nonprofitId: user.id
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
          <label className="block text-sm font-medium mb-2">Event Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={formData.eventDate}
            onChange={e => setFormData({...formData, eventDate: e.target.value})}
            required
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

        <div>
          <label className="block text-sm font-medium mb-2">Use of Funds</label>
          {useOfFunds.map((item, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Category"
                className="flex-1 p-2 border rounded"
                value={item.category}
                onChange={e => handleUseOfFundsChange(index, 'category', e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Percentage"
                className="w-24 p-2 border rounded"
                value={item.percentage}
                onChange={e => handleUseOfFundsChange(index, 'percentage', e.target.value)}
                required
                min="0"
                max="100"
              />
              <button
                type="button"
                onClick={() => removeUseOfFundsCategory(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addUseOfFundsCategory}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add Category
          </button>
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