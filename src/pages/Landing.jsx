import '../styles/landing.css';

export default function Landing({ onGetStarted }) {
  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <div className="landing-nav-content">
          <div className="landing-logo">
            <h2>India Warehousing Survey 2026</h2>
          </div>
          <button className="landing-login-btn" onClick={onGetStarted}>
            Login / Sign Up
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1>Shape the Future of Indian Warehousing</h1>
          <p className="landing-subtitle">
            Your insights matter. Help shape policy and industry strategy through our comprehensive survey.
          </p>
          <button className="landing-cta" onClick={onGetStarted}>
            Get Started →
          </button>
        </div>
      </section>

      <section className="landing-info">
        <div className="landing-container">
          <h2>About This Survey</h2>
          <p className="landing-description">
            The India Warehousing Ecosystem Survey 2026 is a structured research initiative designed to capture stakeholder insights across the warehousing and logistics sector. Your responses will directly influence policy recommendations and industry strategy.
          </p>

          <div className="landing-grid">
            <div className="landing-card">
              <div className="landing-card-icon">📊</div>
              <h3>Comprehensive Coverage</h3>
              <p>75 carefully crafted questions across 15 focused sections covering everything from current state to future outlook.</p>
            </div>

            <div className="landing-card">
              <div className="landing-card-icon">⏱️</div>
              <h3>Quick to Complete</h3>
              <p>Estimated time: 10-15 minutes. Save your progress anytime and continue later from where you left off.</p>
            </div>

            <div className="landing-card">
              <div className="landing-card-icon">🔒</div>
              <h3>Confidential & Secure</h3>
              <p>Your responses are strictly confidential. Data is secure and used only for this research initiative.</p>
            </div>

            <div className="landing-card">
              <div className="landing-card-icon">🎯</div>
              <h3>Role-Based Experience</h3>
              <p>Answer questions relevant to your role: Warehouse Operators, FMCG, E-commerce, Logistics, Government, and more.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-topics">
        <div className="landing-container">
          <h2>What We're Exploring</h2>
          <div className="landing-topics-grid">
            <div className="landing-topic">
              <span className="landing-topic-number">01</span>
              <h4>Current State & Operations</h4>
            </div>
            <div className="landing-topic">
              <span className="landing-topic-number">02</span>
              <h4>Business Scale & Growth</h4>
            </div>
            <div className="landing-topic">
              <span className="landing-topic-number">03</span>
              <h4>Technology Adoption</h4>
            </div>
            <div className="landing-topic">
              <span className="landing-topic-number">04</span>
              <h4>Challenges & Bottlenecks</h4>
            </div>
            <div className="landing-topic">
              <span className="landing-topic-number">05</span>
              <h4>Sustainability & Green Practices</h4>
            </div>
            <div className="landing-topic">
              <span className="landing-topic-number">06</span>
              <h4>Future Outlook & Investment</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-cta-section">
        <div className="landing-container">
          <h2>Ready to Contribute?</h2>
          <p>Join stakeholders across the warehousing ecosystem in shaping the future of Indian logistics.</p>
          <button className="landing-cta-large" onClick={onGetStarted}>
            Start Your Survey Now
          </button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container">
          <p>&copy; 2026 India Warehousing Ecosystem Survey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
