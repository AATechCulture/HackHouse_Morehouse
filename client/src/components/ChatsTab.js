import React from 'react';
import { Link } from 'react-router-dom';
import { useMockData } from '../contexts/MockDataContext';
import { useAuth } from '../contexts/AuthContext';

export function ChatsTab() {
  const { user } = useAuth();
  const { companies, nonprofits, chats } = useMockData();

  // get chat rooms for current user
  const userChatRooms = Object.entries(chats.chatRooms)
    .filter(([roomId]) => {
      const [id1, id2] = roomId.split('-').map(Number);
      return id1 === user.id || id2 === user.id;
    })
    .map(([roomId, messages]) => {
      const [id1, id2] = roomId.split('-').map(Number);
      const otherId = id1 === user.id ? id2 : id1;
      
      // get other participant
      const otherParticipant = user.type === 'corporate' 
        ? nonprofits.find(n => n.id === otherId)
        : companies.find(c => c.id === otherId);

      const lastMessage = messages[messages.length - 1];

      return {
        roomId,
        participant: otherParticipant,
        lastMessage,
        messages
      };
    });

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Your Chats</h2>
      
      <div className="max-w-2xl mx-auto">
        {userChatRooms.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-600">No active chats yet.</p>
            <Link 
              to="/explore" 
              className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              Explore organizations →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userChatRooms.map(({ roomId, participant, lastMessage, messages }) => (
              <Link
                key={roomId}
                to={`/chat/${participant.id}`}
                className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{participant.name}</h3>
                    {lastMessage && (
                      <span className="text-sm text-gray-500">
                        {new Date(lastMessage.timestamp).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  {lastMessage && (
                    <p className="text-gray-600 line-clamp-1">
                      {lastMessage.content}
                    </p>
                  )}
                  <div className="mt-2 text-sm text-gray-500">
                    {messages.length} messages
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}