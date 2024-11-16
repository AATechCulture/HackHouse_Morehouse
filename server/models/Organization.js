const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['non_profit', 'company'] 
  },
  profile: {
    mission: String,
    description: String,
    website: String,
    logo: String,
    size: String,
    location: String,
    focusAreas: [String],  // e.g., education, environment, healthcare
    taxId: String,  // For non-profits
    certifications: [String],  // Verification credentials
    impactMetrics: [{
      metric: String,
      value: Number,
      year: Number
    }]
  },
  socialResponsibility: {  // Primarily for companies
    goals: [String],
    initiatives: [String],
    annualBudget: Number,
    preferredCauses: [String]
  },
  donationHistory: [{
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    amount: Number,
    date: Date,
    type: { type: String, enum: ['monetary', 'in_kind'] }
  }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  partnerships: [{
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    status: { type: String, enum: ['pending', 'active', 'completed'] },
    startDate: Date,
    endDate: Date
  }],
  subscription: {
    plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
    features: [String],
    validUntil: Date
  },
  notifications: [{
    type: { type: String },
    message: String,
    read: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

organizationSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});