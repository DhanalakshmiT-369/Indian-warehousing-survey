import express from 'express';
import Survey from '../models/Survey.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Save/update survey draft
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { respondent, answers, confirmed, confirmedSnapshot, skipped, progress } = req.body;

    let survey = await Survey.findOne({
      'respondent.username': req.user.username,
      status: 'draft'
    });

    if (survey) {
      survey.answers = answers;
      survey.confirmed = confirmed;
      survey.confirmedSnapshot = confirmedSnapshot;
      survey.skipped = skipped;
      survey.progress = progress;
      survey.updatedAt = new Date();
    } else {
      survey = new Survey({
        respondent: { ...respondent, username: req.user.username },
        answers,
        confirmed,
        confirmedSnapshot,
        skipped,
        progress
      });
    }

    await survey.save();
    res.json({ message: 'Survey saved', surveyId: survey._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get draft survey
router.get('/draft', verifyToken, async (req, res) => {
  try {
    const survey = await Survey.findOne({
      'respondent.username': req.user.username,
      status: 'draft'
    });
    res.json(survey || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit survey (mark as completed)
router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { surveyId } = req.body;
    const survey = await Survey.findByIdAndUpdate(
      surveyId,
      { status: 'submitted', submittedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Survey submitted successfully', survey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get submitted surveys (for admin/analytics)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const surveys = await Survey.find({ status: 'submitted' });
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
