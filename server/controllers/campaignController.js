const Campaign = require('../models/Campaign');
const { sendNotification } = require('../utils/notifications');

exports.createCampaign = async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      organization: req.organization._id
    });
    await campaign.save();
    
    // Notify matching organizations
    const matches = await findRelevantOrganizations(campaign);
    for (const match of matches) {
      await sendNotification(match._id, {
        type: 'new_campaign',
        message: `New campaign matching your interests: ${campaign.title}`
      });
    }

    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};