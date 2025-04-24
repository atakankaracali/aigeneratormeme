import { Link } from 'react-router-dom';
import './styles/header.css';
import logo from '/icon-256.png';
import { useState, useEffect } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="AI Meme Generator Logo" className="logo-img" />
          <span className="logo-text">AI Meme Generator</span>
        </Link>
      </div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/how-to-play" onClick={() => setMenuOpen(false)}>How to Play</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
        <Link to="/stats" onClick={() => setMenuOpen(false)}>Stats</Link>
      </nav>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? 'rotate-top' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'fade-out' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'rotate-bottom' : ''}`}></div>
      </div>
    </header>
  );
};

export default Header;