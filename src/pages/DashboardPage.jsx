import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
  CartesianGrid,
} from 'recharts';

// Utility parsers
const parseLikert = (str) => {
  try {
    const arr = JSON.parse(str);
    if (Array.isArray(arr)) return arr.map(Number);
  } catch (_) {}
  return [];
};

const parseRanking = (str, labels) => {
  try {
    const arr = JSON.parse(str);
    if (!Array.isArray(arr)) return [];
    // arr contains indices (0-based) of ranking order; convert to rank per label
    const ranks = labels.map((_, i) => {
      const idx = arr.indexOf(i);
      return idx === -1 ? null : idx + 1; // rank starts at 1
    }).filter((r) => r !== null);
    const avg = ranks.reduce((a, b) => a + b, 0) / (ranks.length || 1);
    return { name: labels.join('/') , avgRank: avg };
  } catch (_) {
    return null;
  }
};

const parseMulti = (str) => {
  if (!str) return [];
  return str.split(';').map(s => s.trim()).filter(Boolean);
};

const DashboardPage = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/responses');
        setResponses(res.data);
        setLoading(false);
      } catch (e) {
        setError(e.message || 'Fetch error');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ------- Data transformations -------
  const overviewData = useMemo(() => {
    if (!responses.length) return [];
    const roleCounts = {};
    const orgCounts = {};
    responses.forEach(r => {
      const role = r.roleName || 'Unknown';
      const org = r.organization || 'Unknown';
      roleCounts[role] = (roleCounts[role] || 0) + 1;
      orgCounts[org] = (orgCounts[org] || 0) + 1;
    });
    return {
      roles: Object.entries(roleCounts).map(([name, value]) => ({ name, value })),
      orgs: Object.entries(orgCounts).map(([name, value]) => ({ name, value })),
    };
  }, [responses]);

  const demographicsData = useMemo(() => {
    // Example: distribution of respondents per month
    const monthMap = {};
    responses.forEach(r => {
      const date = new Date(r.submittedTime);
      if (isNaN(date)) return;
      const key = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}`;
      monthMap[key] = (monthMap[key] || 0) + 1;
    });
    return Object.entries(monthMap).map(([month, count]) => ({ month, count }));
  }, [responses]);

  // Add more memoized calculations for other tabs here…

  // ------- Render helpers -------
  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Roles Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={overviewData.roles} layout="vertical" margin={{ left: 40 }}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Organizations Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={overviewData.orgs} layout="vertical" margin={{ left: 40 }}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="value" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderDemographics = () => (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Responses Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={demographicsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#10B981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  // Placeholder render for other tabs
  const renderPlaceholder = (title) => (
    <div className="p-4"><h2 className="text-xl font-semibold">{title} - Coming Soon</h2></div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return renderOverview();
      case 'Demographics': return renderDemographics();
      case 'Sector Assessment': return renderPlaceholder('Sector Assessment');
      case 'Technology': return renderPlaceholder('Technology');
      case 'Policy & Future': return renderPlaceholder('Policy & Future');
      default: return null;
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-600">Error loading responses: {error}</div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-800">India Warehousing Survey 2026 – Admin Dashboard</h1>
            <div className="space-x-4">
              {['Overview','Demographics','Sector Assessment','Technology','Policy & Future'].map(tab => (
                <button
                  key={tab}
                  className={`px-3 py-1 rounded ${activeTab===tab ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-indigo-500 hover:text-white transition`}
                  onClick={() => setActiveTab(tab)}
                >{tab}</button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      {renderContent()}
    </div>
  );
};

export default DashboardPage;
