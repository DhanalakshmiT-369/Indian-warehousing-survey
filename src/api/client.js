const API_URL = '/api';

// Helper to safely parse JSON responses
async function parseJSON(response) {
  try {
    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON parse error:', error);
    return null;
  }
}

export const apiClient = {
  async login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await parseJSON(res);
    if (!res.ok) {
      throw new Error(data?.error || 'Login failed');
    }
    return data;
  },

  async saveSurvey(respondent, answers, confirmed, confirmedSnapshot, skipped, progress) {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_URL}/survey/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ respondent, answers, confirmed, confirmedSnapshot, skipped, progress })
    });
    const data = await parseJSON(res);
    if (!res.ok) throw new Error(data?.error || 'Failed to save survey');
    return data;
  },

  async getDraft() {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_URL}/survey/draft`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await parseJSON(res);
    if (!res.ok) throw new Error(data?.error || 'Failed to fetch draft');
    return data;
  },

  async submitSurvey(surveyId) {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_URL}/survey/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ surveyId })
    });
    const data = await parseJSON(res);
    if (!res.ok) throw new Error(data?.error || 'Failed to submit survey');
    return data;
  },

  async saveReferrals(referrals) {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_URL}/survey/referral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ referrals })
    });
    const data = await parseJSON(res);
    if (!res.ok) throw new Error(data?.error || 'Failed to save referrals');
    return data;
  }
};

