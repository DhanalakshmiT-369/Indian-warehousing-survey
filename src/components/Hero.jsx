export default function Hero({ onStartSurvey }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-eyebrow">India Warehousing Ecosystem Survey 2026</p>
        <h1>Capture stakeholder insights for better warehousing decisions.</h1>
        <p>
          A structured survey experience for tracking warehouse priorities,
          investment signals, infrastructure gaps, and future outlook.
        </p>
        <button className="hero-action" type="button" onClick={onStartSurvey}>Start survey</button>
      </div>
    </section>
  );
}
