import { useEffect, useState } from 'react';

import './styles/navbar.css';
import './styles/hero.css';
import './styles/survey.css';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Survey from './pages/Survey.jsx';

const roles = [
  { code: 'WH/3PL', label: 'Warehouse Operators / 3PL Providers' },
  { code: 'MFCG', label: 'Manufacturers / FMCG / Retail' },
  { code: 'ECOM', label: 'E-commerce Companies' },
  { code: 'LSP', label: 'Logistics Service Providers' },
  { code: 'GOVT', label: 'Government / Policy Makers / Regulators' },
  { code: 'TECH', label: 'Technology Providers' },
  { code: 'EXPRT', label: 'Industry Experts / Consultants' },
];

const authorizedUsers = [
  { username: 'admin', password: 'survey2026' },
  { username: 'user', password: 'warehouse2026' },
];

const routes = {
  credentials: '/credentials',
  main: '/main',
  roles: '/roles',
  questions: '/questions',
  finished: '/finished',
};

function getCurrentRoute() {
  const path = window.location.pathname;
  return Object.values(routes).includes(path) ? path : routes.credentials;
}

export default function App() {
  const [credentials, setCredentials] = useState(null);
  const [respondentDetails, setRespondentDetails] = useState(null);
  const [role, setRole] = useState('');
  const [loginError, setLoginError] = useState('');
  const [route, setRoute] = useState(getCurrentRoute);

  const navigate = (nextRoute) => {
    window.history.pushState({}, '', nextRoute);
    setRoute(nextRoute);
  };

  useEffect(() => {
    if (!Object.values(routes).includes(window.location.pathname)) {
      window.history.replaceState({}, '', routes.credentials);
    }

    const handlePopState = () => setRoute(getCurrentRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleCredentialsSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username')?.trim();
    const password = formData.get('password')?.trim();
    const isAuthorized = authorizedUsers.some(
      (user) => user.username === username && user.password === password
    );

    if (!isAuthorized) {
      setLoginError('Invalid username or password.');
      return;
    }

    setLoginError('');
    setCredentials({ username });
    navigate(routes.main);
  };

  const handleRespondentDetailsSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setRespondentDetails({
      name: formData.get('name')?.trim(),
      email: formData.get('email')?.trim(),
      organization: formData.get('organization')?.trim(),
    });
  };

  if (!credentials || route === routes.credentials) {
    return (
      <main className="gate-screen">
        <form className="gate-card" onSubmit={handleCredentialsSubmit}>
          <p className="gate-eyebrow">India Warehousing Ecosystem Survey 2026</p>
          <h1>Enter your credentials</h1>
          <label>
            Username
            <input name="username" type="text" placeholder="Username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" required />
          </label>
          {loginError && <p className="gate-error">{loginError}</p>}
          <button className="hero-action" type="submit">Continue</button>
        </form>
      </main>
    );
  }

  if (route === routes.roles) {
    return (
      <>
        <Navbar />
        <main className="role-screen">
          <section className="role-card">
            {!respondentDetails ? (
              <form className="respondent-form" onSubmit={handleRespondentDetailsSubmit}>
                <p className="gate-eyebrow">Before the survey</p>
                <h1>Your details</h1>
                <label>
                  Name
                  <input name="name" type="text" placeholder="Your full name" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" placeholder="you@example.com" />
                </label>
                <label>
                  Organization / Company name
                  <input name="organization" type="text" placeholder="Company or organization" required />
                </label>
                <button className="hero-action" type="submit">Continue to role</button>
              </form>
            ) : (
              <>
                <p className="gate-eyebrow">Before the survey</p>
                <h1>Select your role</h1>
                <div className="role-grid">
                  {roles.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setRole(item);
                        navigate(routes.questions);
                      }}
                    >
                      <span className="role-code">{item.code}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (route === routes.questions || route === routes.finished) {
    return (
      <Survey
        initialScreen={route === routes.finished ? 'complete' : 'survey'}
        onFinish={() => navigate(routes.finished)}
        respondent={{ ...credentials, ...respondentDetails, role: role.label, roleCode: role.code }}
      />
    );
  }

  return (
    <>
      <Navbar />
      <Home onStartSurvey={() => navigate(routes.roles)} />
      <Footer />
    </>
  );
}
