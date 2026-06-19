import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Score from './models/Score.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection setup
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/typingspeed";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => console.log('🔌 Connected to MongoDB successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Implement Save Score Endpoint (/score and /api/leaderboard)
app.post(['/score', '/api/leaderboard'], async (req, res) => {
  const { name, wpm, accuracy } = req.body;
  if (!name || wpm === undefined) {
    return res.status(400).json({ error: 'Name and WPM are required fields.' });
  }

  try {
    // Check if the user already exists in the database
    let scoreEntry = await Score.findOne({ name });
    
    if (!scoreEntry) {
      // If not, create a new entry
      scoreEntry = new Score({ name, wpm, accuracy: accuracy || 100 });
      await scoreEntry.save();
    } else {
      // If yes, update only if the new wpm is higher
      if (wpm > scoreEntry.wpm) {
        scoreEntry.wpm = wpm;
        if (accuracy !== undefined) {
          scoreEntry.accuracy = accuracy;
        }
        await scoreEntry.save();
      }
    }

    // After saving, fetch all scores, sort by WPM in descending order, and return the leaderboard as JSON
    const leaderboard = await Score.find().sort({ wpm: -1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    console.error('Error saving score:', err);
    res.status(500).json({ error: 'Internal server error while saving score.' });
  }
});

// Implement Get Leaderboard Endpoint (/leaderboard and /api/leaderboard)
app.get(['/leaderboard', '/api/leaderboard'], async (req, res) => {
  try {
    const leaderboard = await Score.find().sort({ wpm: -1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Internal server error while fetching leaderboard.' });
  }
});

app.listen(PORT, () => console.log(`🚀 Backend running on Port Number ${PORT}`));
