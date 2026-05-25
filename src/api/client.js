const API_URL = '/api';

export const apiClient = {
  async login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Login failed');
    }
    return res.json();
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
    if (!res.ok) throw new Error('Failed to save survey');
    return res.json();
  },

  async getDraft() {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_URL}/survey/draft`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch draft');
    return res.json();
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
    if (!res.ok) throw new Error('Failed to submit survey');
    return res.json();
  }
};

