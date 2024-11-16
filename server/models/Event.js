// non_profit/server/models/Event.js
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    date: { type: Date, required: true },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number],
      address: String,
      virtual: Boolean,
      meetingLink: String
    },
    type: { 
      type: String, 
      enum: ['volunteer', 'fundraiser', 'networking', 'information'], 
      required: true 
    },
    capacity: {
      volunteers: Number,
      attendees: Number
    },
    registrations: [{
      participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
      type: String,  // volunteer, attendee, sponsor
      status: String,
      notes: String
    }],
    requirements: {
      skills: [String],
      resources: [String],
      minimumCommitment: String
    },
    impact: {
      goals: [String],
      metrics: [{
        name: String,
        value: Number
      }]
    }
  }, { timestamps: true });