// non_profit/server/models/Campaign.js
const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    type: { type: String, enum: ['monetary', 'in_kind'], required: true },
    goal: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tags: [String],
    impact: {
      metrics: [{
        name: String,
        target: Number,
        current: Number
      }],
      updates: [{
        date: Date,
        description: String,
        metrics: Object
      }]
    },
    matching: [{
      organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
      amount: Number,
      ratio: Number,  // e.g., 1 for 1:1 matching
      conditions: String
    }]
  }, { timestamps: true });
  