import SurveyApp from '../components/SurveyApp.jsx';

export default function Survey({ initialScreen = 'survey', respondent, onFinish }) {
  return (
    <section id="survey">
      <SurveyApp initialScreen={initialScreen} respondent={respondent} onFinish={onFinish} />
    </section>
  );
}
