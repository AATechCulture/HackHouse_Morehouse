import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMockData } from '../contexts/MockDataContext';
import { useAuth } from '../contexts/AuthContext';

export function Chat() {
  const { id } = useParams();
  const { user } = useAuth();
  const { companies, nonprofits, chats, addMessage } = useMockData();
  const [input, setInput] = useState('');

  // find chat participants for chat room
  const company = companies.find(c => c.id === parseInt(id));
  const nonprofit = nonprofits.find(n => n.id === parseInt(id));
  const participant = company || nonprofit;

  const roomId = [user.id, parseInt(id)].sort().join('-');
  const messages = chats.chatRooms[roomId] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage(user.id, participant.id, input.trim());
    setInput('');
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">Chat with {participant?.name}</h2>
        </div>

        <div className="h-[500px] overflow-y-auto p-4">
          {messages.map(message => {
            const isFromCurrentUser = message.fromId === user.id;
            return (
              <div
                key={message.id}
                className={`mb-4 ${isFromCurrentUser ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block max-w-[70%] p-3 rounded-lg ${
                    isFromCurrentUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t p-4">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}