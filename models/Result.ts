import mongoose from 'mongoose'

const ResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testType: {
    type: String,
    required: true,
    enum: ['IELTS', 'SAT', 'CEFR']
  },
  section: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  level: {
    type: String
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    selectedAnswer: {
      type: Number
    },
    isCorrect: {
      type: Boolean
    }
  }],
  timeSpent: {
    type: Number, // in minutes
    default: 0
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Result || mongoose.model('Result', ResultSchema)