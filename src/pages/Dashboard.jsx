import SurveyCard from '../components/SurveyCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

export default function Dashboard() {
  return (
    <section className="home-summary" id="dashboard">
      <SurveyCard title="Questions" value="75" detail="Across 15 focused sections" />
      <SurveyCard title="Sections" value="15" detail="Organized by industry theme" />
      <SurveyCard title="Status" value="Draft" detail="Responses save locally in the browser" />
      <ProgressBar value={0} label="Survey completion" />
    </section>
  );
}

