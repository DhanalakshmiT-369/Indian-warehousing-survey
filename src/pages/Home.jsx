import Hero from '../components/Hero.jsx';
import SurveyCard from '../components/SurveyCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

export default function Home({ onStartSurvey }) {
  return (
    <main>
      <Hero onStartSurvey={onStartSurvey} />
      <section className="home-summary" id="dashboard">
        <SurveyCard title="Questions" value="75" detail="Across 15 focused sections" />
        <SurveyCard title="Sections" value="15" detail="From current state to future outlook" />
        <SurveyCard title="Estimated Time" value="25-45 min" detail="Save and continue as needed" />
        <ProgressBar value={0} label="Survey completion" />
      </section>
    </main>
  );
}
