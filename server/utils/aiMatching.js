// non_profit/server/utils/aiMatching.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // The API key is automatically loaded from environment variables
});

exports.analyzeAlignment = async (organization, potentialMatches) => {
  const matches = [];
  
  for (const match of potentialMatches) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert at analyzing alignment between organizations. Analyze the compatibility between a company and non-profit based on their missions, goals, and focus areas. Provide a numerical score between 0 and 1, and list specific areas of alignment."
          },
          {
            role: "user",
            content: `
              Organization 1: ${JSON.stringify({
                type: organization.type,
                mission: organization.profile.mission,
                goals: organization.socialResponsibility?.goals || organization.profile.focusAreas,
                initiatives: organization.socialResponsibility?.initiatives || []
              })}
              
              Organization 2: ${JSON.stringify({
                type: match.type,
                mission: match.profile.mission,
                goals: match.socialResponsibility?.goals || match.profile.focusAreas,
                initiatives: match.socialResponsibility?.initiatives || []
              })}
            `
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const analysis = completion.choices[0].message;
      
      // Parse the AI response to extract score and alignment areas
      const alignmentScore = parseAlignmentScore(analysis.content);
      const alignmentAreas = parseAlignmentAreas(analysis.content);

      if (alignmentScore > 0.6) {  // Only include strong matches
        matches.push({
          organization: match,
          alignmentScore,
          alignmentAreas,
          aiAnalysis: analysis.content
        });
      }
    } catch (error) {
      console.error(`Error analyzing match for organization ${match._id}:`, error);
      continue;  // Skip this match if there's an error, but continue with others
    }
  }

  return matches.sort((a, b) => b.alignmentScore - a.alignmentScore);
};

// Helper function to parse alignment score from AI response
const parseAlignmentScore = (content) => {
  try {
    // Extract numerical score from AI response
    const scoreMatch = content.match(/\b(0\.\d+|\d+)\b/);
    return scoreMatch ? parseFloat(scoreMatch[0]) : 0;
  } catch (error) {
    console.error('Error parsing alignment score:', error);
    return 0;
  }
};

// Helper function to parse alignment areas from AI response
const parseAlignmentAreas = (content) => {
  try {
    // Extract key alignment areas from AI response
    // This is a simplified example - you might want to make this more sophisticated
    const areas = content.match(/(?:alignment areas?|matches in):?(.*?)(?:\.|$)/i);
    if (areas && areas[1]) {
      return areas[1].split(',').map(area => area.trim()).filter(Boolean);
    }
    return [];
  } catch (error) {
    console.error('Error parsing alignment areas:', error);
    return [];
  }
};

// Function to analyze mission statement sentiment
exports.analyzeMissionStatement = async (mission) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Analyze this mission statement and identify key focus areas, values, and target beneficiaries. Provide a structured analysis."
        },
        {
          role: "user",
          content: mission
        }
      ],
      temperature: 0.5
    });

    return {
      analysis: completion.choices[0].message.content,
      success: true
    };
  } catch (error) {
    console.error('Error analyzing mission statement:', error);
    return {
      analysis: null,
      success: false,
      error: error.message
    };
  }
};

// Function to generate partnership recommendations
exports.generatePartnershipIdeas = async (organization1, organization2) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Generate specific partnership ideas for these organizations based on their profiles, suggesting concrete initiatives and projects they could collaborate on."
        },
        {
          role: "user",
          content: `
            Organization 1: ${JSON.stringify(organization1)}
            Organization 2: ${JSON.stringify(organization2)}
          `
        }
      ],
      temperature: 0.8,
      max_tokens: 1000
    });

    return {
      ideas: completion.choices[0].message.content,
      success: true
    };
  } catch (error) {
    console.error('Error generating partnership ideas:', error);
    return {
      ideas: null,
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  analyzeAlignment,
  analyzeMissionStatement,
  generatePartnershipIdeas
};