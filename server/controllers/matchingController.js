// non_profit/server/controllers/matchingController.js
const Organization = require('../models/Organization');
const { analyzeAlignment } = require('../utils/aiMatching');

exports.findMatches = async (req, res) => {
  try {
    const organization = await Organization.findById(req.organization._id);
    
    // Get potential matches based on type (companies for non-profits and vice versa)
    const potentialMatches = await Organization.find({
      type: organization.type === 'company' ? 'non_profit' : 'company'
    });

    // Use AI to analyze alignment
    const matches = await analyzeAlignment(organization, potentialMatches);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};