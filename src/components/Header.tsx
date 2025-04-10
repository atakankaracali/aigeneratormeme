import './styles/header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <span className="header-title">😂 AI Meme Generator</span>
      </div>
      <div className="header-right">
        <a
          href="https://github.com/atakankaracali/aigeneratormeme"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link"
        >
          GitHub
        </a>
        <span className="header-divider">•</span>
        <span className="header-made">Made with ❤️</span>
      </div>
    </header>
  );
};

export default Header;
