export default function ProgressBar({ value = 0, label = 'Progress' }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="progress-widget" aria-label={label}>
      <div className="progress-widget-meta">
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>
      <div className="progress-widget-track">
        <div className="progress-widget-fill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
