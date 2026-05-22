export default function Navbar() {
  return (
    <header className="navbar">
      <a className="navbar-brand" href="#home">India Warehousing Survey</a>
      <nav className="navbar-links" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#survey">Survey</a>
        <a href="#dashboard">Dashboard</a>
      </nav>
    </header>
  );
}
