import mongoose from 'mongoose'

const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  testType: {
    type: String,
    required: true,
    enum: ['IELTS', 'SAT', 'CEFR']
  },
  limit: {
    type: Number,
    required: true,
    min: 1,
    max: 200
  },
  used: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  usedBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    usedAt: {
      type: Date,
      default: Date.now
    }
  }]
})

export default mongoose.models.Code || mongoose.model('Code', CodeSchema)