import { Link } from 'react-router-dom';
import './styles/header.css';
import logo from '/icon-256.png';

const Header = () => (
  <header className="header">
    <div className="logo">
      <Link to="/" className="logo-link">
        <img src={logo} alt="AI Meme Generator Logo" className="logo-img" />
        <span className="logo-text">AI Meme Generator</span>
      </Link>
    </div>
    <nav className="nav-links">
      <Link to="/how-to-play">How to Play</Link>
      <Link to="/about">About</Link>
    </nav>
  </header>
);

export default Header;