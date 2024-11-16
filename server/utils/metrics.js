exports.calculateImpactMetrics = async (organization) => {
    const metrics = {
      totalDonations: 0,
      campaignSuccess: 0,
      volunteersEngaged: 0,
      beneficiariesReached: 0,
      partnershipsCounted: 0
    };
  
    // Calculate metrics from campaigns and events
    const campaigns = await Campaign.find({ organization: organization._id });
    const events = await Event.find({ organization: organization._id });
  
    // Aggregate metrics
    campaigns.forEach(campaign => {
      metrics.totalDonations += campaign.currentAmount;
      if (campaign.status === 'completed' && campaign.currentAmount >= campaign.goal) {
        metrics.campaignSuccess++;
      }
    });
  
    events.forEach(event => {
      metrics.volunteersEngaged += event.registrations.filter(r => r.type === 'volunteer').length;
      if (event.impact && event.impact.metrics) {
        event.impact.metrics.forEach(metric => {
          if (metric.name === 'beneficiariesReached') {
            metrics.beneficiariesReached += metric.value;
          }
        });
      }
    });
  
    return metrics;
  };