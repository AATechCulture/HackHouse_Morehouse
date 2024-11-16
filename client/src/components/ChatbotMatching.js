// src/components/ChatbotMatching.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

export function ChatbotMatching() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  // Prepare the initial context for the AI
  const systemContext = `You are an AI assistant for a corporate social responsibility (CSR) platform that matches corporations with non-profit organizations. Your role is to:
  1. Understand the company's CSR goals and values
  2. Recommend relevant non-profit partnerships
  3. Suggest potential collaboration opportunities
  4. Provide insights on impact measurement

  When providing recommendations, use markdown formatting for better readability.
  Use ## for section headings and * for bullet points.
  
  When recommending a non-profit, always include a special tag like this to enable linking:
  [NONPROFIT_ID:1] Organization Name
  
  For example:
  ## Recommended Non-Profits
  
  [NONPROFIT_ID:1] Education First
  * Focus: Education, Youth Development
  * Alignment: Strong match with your education initiatives
  
  [NONPROFIT_ID:2] Green Future
  * Focus: Environmental Sustainability
  * Alignment: Matches your sustainability goals
  
  ## Next Steps
  * Review these organizations' profiles
  * Schedule initial meetings
  * Explore collaboration opportunities`;

  const generateResponse = async (userInput) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `${systemContext}\n\nUser Query: ${userInput}\n\nResponse:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      return "I apologize, but I'm having trouble processing your request at the moment. Please try again.";
    }
  };

  // Function to convert text with nonprofit tags to JSX with links
  const renderMessageWithLinks = (text) => {
    // First, split the text into parts that contain nonprofit tags and those that don't
    const parts = text.split(/(\[NONPROFIT_ID:\d+\])/g);
    
    return parts.map((part, index) => {
      const match = part.match(/\[NONPROFIT_ID:(\d+)\]/);
      if (match) {
        const id = match[1];
        // Get the organization name from the next part if it exists
        const orgName = parts[index + 1]?.trim().split('\n')[0];
        return (
          <Link
            key={index}
            to={`/nonprofit/${id}`}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {orgName}
          </Link>
        );
      }
      // Don't render the part if it's immediately after a nonprofit tag (we handled it above)
      if (index > 0 && parts[index - 1].match(/\[NONPROFIT_ID:\d+\]/)) {
        // Return the rest of the text after the org name
        const lines = part.split('\n');
        lines.shift(); // Remove the org name line
        return <ReactMarkdown key={index}>{lines.join('\n')}</ReactMarkdown>;
      }
      // Regular text
      return <ReactMarkdown key={index}>{part}</ReactMarkdown>;
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      const aiResponse = await generateResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', content: aiResponse }]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "I apologize, but I'm having trouble responding at the moment. Please try again."
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">CSR Matching Assistant</h2>
        
        {/* Chat messages */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 h-[500px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 ${
                msg.type === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.type === 'user' ? (
                  msg.content
                ) : (
                  <div className="prose prose-sm max-w-none">
                    {renderMessageWithLinks(msg.content)}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left">
              <div className="inline-block bg-gray-200 text-gray-800 p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your CSR goals and preferences..."
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>

        {/* Suggested prompts */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Suggested prompts:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "We're looking to support education initiatives",
              "Our focus is on environmental sustainability",
              "We want to engage employees in volunteering",
              "Looking for local community impact opportunities"
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInput(prompt)}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}