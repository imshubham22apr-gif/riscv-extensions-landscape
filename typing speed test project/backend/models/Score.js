import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  wpm: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true,
    default: 100
  }
}, { timestamps: true });

const Score = mongoose.model('Score', scoreSchema);

export default Score;
