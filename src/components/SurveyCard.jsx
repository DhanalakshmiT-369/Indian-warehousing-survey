export default function SurveyCard({ title, value, detail }) {
  return (
    <article className="survey-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}
