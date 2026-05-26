import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  respondent: {
    name: String,
    email: String,
    organization: String,
    role: String,
    roleCode: String,
    username: String
  },
  answers: mongoose.Schema.Types.Mixed,
  confirmed: mongoose.Schema.Types.Mixed,
  confirmedSnapshot: mongoose.Schema.Types.Mixed,
  skipped: mongoose.Schema.Types.Mixed,
  progress: {
    currentSectionIdx: Number,
    totalAnswered: Number,
    totalQuestions: Number
  },
  referrals: [{
    name: String,
    email: String,
    organization: String,
    createdAt: { type: Date, default: Date.now }
  }],
  status: { type: String, enum: ['draft', 'submitted'], default: 'draft' },
  submittedAt: Date
}, { timestamps: true });

export default mongoose.model('Survey', surveySchema);
