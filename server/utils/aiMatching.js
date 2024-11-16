// non_profit/server/utils/aiMatching.js
const { OpenAI } = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.analyzeAlignment = async (organization, potentialMatches) => {
  const matches = [];
  
  for (const match of potentialMatches) {
    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "Analyze the alignment between a company and non-profit organization based on their missions, goals, and focus areas."
      }, {
        role: "user",
        content: `Organization 1: ${JSON.stringify({
          mission: organization.profile.mission,
          goals: organization.socialResponsibility?.goals || organization.profile.focusAreas,
          initiatives: organization.socialResponsibility?.initiatives || []
        })}
        
        Organization 2: ${JSON.stringify({
          mission: match.profile.mission,
          goals: match.socialResponsibility?.goals || match.profile.focusAreas,
          initiatives: match.socialResponsibility?.initiatives || []
        })}`
      }]
    });

    const alignmentScore = parseAlignmentScore(analysis.choices[0].message.content);
    
    if (alignmentScore > 0.6) {  // Only include strong matches
      matches.push({
        organization: match,
        alignmentScore,
        alignmentAreas: parseAlignmentAreas(analysis.choices[0].message.content)
      });
    }
  }

  return matches.sort((a, b) => b.alignmentScore - a.alignmentScore);
};