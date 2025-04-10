import './styles/header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">😂 AI Meme Generator</h1>
      <nav>
        <a href="https://github.com/atakankaracali" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </nav>
    </header>
  );
};

export default Header;