import React, { useState } from 'react';

export function ChatbotMatching() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { type: 'user', content: input }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: `Based on your interests in "${input}", here are some matching non-profits...`
      }]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4 h-96 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 ${
              msg.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Describe your CSR goals..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}