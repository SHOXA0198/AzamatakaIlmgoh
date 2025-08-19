import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
  examType: {
    type: String,
    required: true,
    enum: ['IELTS','CEFR','SAT']
  },
  section: {
    type: String,
    default: 'General'
  },
  type: {
    type: String,
    enum: ['mcq','short','boolean'],
    default: 'mcq',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [String], // mcq only
  correct: {
    type: mongoose.Schema.Types.Mixed, // string | boolean
    required: true
  },
  points: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema)
