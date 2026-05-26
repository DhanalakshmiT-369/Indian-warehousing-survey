import express from 'express';
import Survey from '../models/Survey.js';
import { verifyToken } from '../middleware/auth.js';
import { localDb } from '../localDb.js';

const router = Router();

function Router() {
  return express.Router();
}

// Save/update survey draft
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { respondent, answers, confirmed, confirmedSnapshot, skipped, progress } = req.body;

    const isConnected = req.app.locals.mongoConnected();
    if (!isConnected) {
      const survey = await localDb.saveSurveyDraft(req.user.username, {
        respondent,
        answers,
        confirmed,
        confirmedSnapshot,
        skipped,
        progress
      });
      return res.json({ message: 'Survey saved (offline mode)', surveyId: survey._id });
    }

    let survey = await Survey.findOne({
      'respondent.username': req.user.username,
      status: 'draft'
    });

    if (survey) {
      survey.respondent = { ...respondent, username: req.user.username };
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
    const isConnected = req.app.locals.mongoConnected();
    if (!isConnected) {
      const survey = await localDb.getSurveyDraft(req.user.username);
      return res.json(survey || {});
    }

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

    const isConnected = req.app.locals.mongoConnected();
    if (!isConnected) {
      const survey = await localDb.submitSurvey(surveyId);
      return res.json({ message: 'Survey submitted successfully (offline mode)', survey });
    }

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
    const isConnected = req.app.locals.mongoConnected();
    if (!isConnected) {
      const surveys = await localDb.getAllSubmittedSurveys();
      return res.json(surveys);
    }

    const surveys = await Survey.find({ status: 'submitted' });
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save referral contacts
router.post('/referral', verifyToken, async (req, res) => {
  try {
    const { referrals } = req.body;

    const isConnected = req.app.locals.mongoConnected();
    if (!isConnected) {
      return res.json({ message: 'Referral saved (offline mode)' });
    }

    const survey = await Survey.findOne({
      'respondent.username': req.user.username,
      status: 'draft'
    });

    if (survey) {
      if (!survey.referrals) survey.referrals = [];
      survey.referrals.push(...referrals);
      await survey.save();
      res.json({ message: 'Referrals saved successfully' });
    } else {
      res.status(404).json({ error: 'Survey draft not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;