import './styles/navbar.css';
import './styles/hero.css';
import './styles/survey.css';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Survey from './pages/Survey.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Survey />
      <Footer />
    </>
  );
}
