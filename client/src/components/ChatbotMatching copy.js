import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useMockData } from '../contexts/MockDataContext';
import ReactMarkdown from 'react-markdown';

const MatchScore = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-blue-600';
    if (score >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="my-3">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Match Score</span>
        <span>{score}%</span>
      </div>
      <div className="bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${getScoreColor(score)} transition-all duration-500`}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
    </div>
  );
};

export function ChatbotMatching() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { nonprofits } = useMockData();

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const nonprofitDescriptions = nonprofits.map(np => `
Organization ID: ${np.id}
Name: ${np.name}
Mission: ${np.mission}
Focus Areas: ${np.focusAreas.join(', ')}
Location: ${np.location}
Impact Metrics:
- People Helped: ${np.impact.peopleHelped?.toLocaleString() || 'N/A'}
- Programs Launched: ${np.impact.programsLaunched || 'N/A'}
- Communities Served: ${np.impact.communitiesServed || 'N/A'}
  `).join('\n\n');

  const systemContext = `You are an AI assistant specializing in matching corporations with non-profit organizations based on value alignment and goals. You have access to the following non-profit organizations ONLY. Do not recommend or reference any other organizations outside this list:

${nonprofitDescriptions}

Your role is to:
1. Analyze corporate goals and values
2. Match these with ONLY the above non-profit organizations based on:
   - Mission alignment
   - Focus areas
   - Impact goals
   - Geographic focus
   - Type of involvement preferred (financial, volunteer, skills-based)

When analyzing, consider:
- Company's industry context
- ESG priorities
- Scale of impact desired
- Resource availability (financial and human capital)

Format recommendations using this exact structure with the separator:

---RECOMMENDATION START---
[NONPROFIT_ID:X] Organization Name

Alignment Score: {number}

Key Alignments:
* Point 1
* Point 2

Value Match:
* How the non-profit's values align with company values

Engagement Opportunities:
* Specific ways the company can get involved
---RECOMMENDATION END---

Provide 1-2 recommendations maximum, focusing on quality of match over quantity. Only recommend from the provided list of non-profits.`;

  const generateResponse = async (userInput) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const conversationHistory = messages.map(m => 
        `${m.type === 'user' ? 'Company' : 'Assistant'}: ${m.content}`
      ).join('\n');

      const prompt = `
${systemContext}

Previous Conversation:
${conversationHistory}

Company's Current Query: ${userInput}

Based on the company's goals and ONLY the available non-profits listed above, provide specific, strategic recommendations for partnerships. Remember to only suggest from the provided non-profit organizations and include concrete next steps for engagement.

Response:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      return "I apologize, but I'm having trouble processing your request at the moment. Please try again.";
    }
  };

  const renderMessageWithLinksAndMarkdown = (text) => {
    // check if this is a recommendation message
    if (!text.includes('---RECOMMENDATION START---')) {
      // If not render as regular markdown
      return (
        <ReactMarkdown
          className="prose prose-blue max-w-none"
          components={{
            h1: ({node, children, ...props}) => 
              children ? <h1 className="text-2xl font-bold mb-4" {...props}>{children}</h1> : null,
            h2: ({node, children, ...props}) => 
              children ? <h2 className="text-xl font-bold mb-3" {...props}>{children}</h2> : null,
            h3: ({node, children, ...props}) => 
              children ? <h3 className="text-lg font-semibold mb-2" {...props}>{children}</h3> : null,
            ul: ({node, children, ...props}) => 
              children ? <ul className="list-disc pl-6 mb-4" {...props}>{children}</ul> : null,
            li: ({node, children, ...props}) => 
              children ? <li className="mb-1" {...props}>{children}</li> : null,
          }}
        >
          {text}
        </ReactMarkdown>
      );
    }

    const recommendations = text.split('---RECOMMENDATION START---')
      .filter(part => part.trim())
      .map(part => part.split('---RECOMMENDATION END---')[0].trim());

    return recommendations.map((recommendation, index) => {
      const idMatch = recommendation.match(/\[NONPROFIT_ID:(\d+)\]/);
      if (!idMatch) return null;

      const id = idMatch[1];
      const lines = recommendation.split('\n').filter(line => line.trim());
      
      const orgName = lines[0].replace(/\[NONPROFIT_ID:\d+\]/, '').trim();
      
      const scoreMatch = recommendation.match(/Alignment Score:\s*(\d+)/);
      const score = scoreMatch ? Math.min(parseInt(scoreMatch[1]), 100) : null;
      
      const contentStart = recommendation.indexOf('Key Alignments:');
      const content = contentStart !== -1 ? recommendation.slice(contentStart) : '';

      return (
        <div key={index} className="mb-6">
          <Link
            to={`/nonprofit/${id}`}
            className="text-blue-600 hover:text-blue-800 text-xl font-semibold block mb-2"
          >
            {orgName}
          </Link>
          {score !== null && <MatchScore score={score} />}
          <ReactMarkdown
            className="prose prose-blue max-w-none"
            components={{
              h1: ({node, children, ...props}) => 
                children ? <h1 className="text-2xl font-bold mb-4" {...props}>{children}</h1> : null,
              h2: ({node, children, ...props}) => 
                children ? <h2 className="text-xl font-bold mb-3" {...props}>{children}</h2> : null,
              h3: ({node, children, ...props}) => 
                children ? <h3 className="text-lg font-semibold mb-2" {...props}>{children}</h3> : null,
              ul: ({node, children, ...props}) => 
                children ? <ul className="list-disc pl-6 mb-4" {...props}>{children}</ul> : null,
              li: ({node, children, ...props}) => 
                children ? <li className="mb-1" {...props}>{children}</li> : null,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
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

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        type: 'bot',
        content: `# Welcome to Strategic Non-Profit Matching!

I'm here to help match your company with our available non-profit organizations that align with your values and goals. To provide the best recommendations, please tell me about:

### Key Information Needed
* Your company's main focus areas for social impact
* Preferred type of involvement (financial support, volunteering, skills-based contributions)
* Geographic focus (local, national, or global)
* Any specific causes or UN SDGs you're particularly interested in

Feel free to share as much detail as possible about your CSR goals and values, and I'll match you with the most suitable organizations from our network.`
      }]);
    }
  }, [messages.length]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Strategic Non-Profit Matching Assistant</h2>
        
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
                className={`inline-block max-w-[85%] p-4 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                {msg.type === 'user' ? (
                  msg.content
                ) : (
                  <div className="prose prose-sm max-w-none">
                    {renderMessageWithLinksAndMarkdown(msg.content)}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left">
              <div className="inline-block bg-white border border-gray-200 text-gray-800 p-4 rounded-lg">
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
          <p className="text-sm text-gray-600 mb-2">Example queries:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "We're looking to support education initiatives with both funding and employee volunteering",
              "Our company focuses on environmental sustainability and want to make a local impact",
              "We want to contribute technical expertise to nonprofits working on digital inclusion",
              "Looking for nonprofits aligned with UN SDGs 4 and 13"
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