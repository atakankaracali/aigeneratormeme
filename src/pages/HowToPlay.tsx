import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/howtoplay.css';
import Footer from '../components/Footer';
import useCanonical from '../hooks/useCanonical';

const HowToPlay = () => {
  useCanonical();
  return (
    <div className="howto-container">
      <motion.h1
        className="howto-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎮 How to Play: AI Meme Generator
      </motion.h1>

      <motion.p
        className="howto-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Follow these 3 simple steps to turn your emotions into hilarious AI-generated memes:
      </motion.p>

      <div className="howto-steps">
        <motion.div className="howto-card" whileHover={{ scale: 1.05 }}>
          <span className="step-number">1️⃣</span>
          <h3>Select Your Mode</h3>
          <p>Choose from Classic, Roast Me, or Manifest mode to match your mood or vibe.</p>
        </motion.div>

        <motion.div className="howto-card" whileHover={{ scale: 1.05 }}>
          <span className="step-number">2️⃣</span>
          <h3>Answer Fun Prompts</h3>
          <p>Tell us how you feel or what is been on your mind lately. Quick, short, and honest.</p>
        </motion.div>

        <motion.div className="howto-card" whileHover={{ scale: 1.05 }}>
          <span className="step-number">3️⃣</span>
          <h3>Get Your Meme</h3>
          <p>Let the AI do its magic and enjoy your unique meme. Copy, download, or share instantly.</p>
        </motion.div>
      </div>

      <motion.div
        className="howto-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link to="/meme" className="try-button">
          🚀 Try it Now
        </Link>
      </motion.div>
      <div className="seo-howto-block">
        <h2>How Does AI Meme Generator Work?</h2>
        <p>
          Our <strong>AI Meme Generator</strong> uses natural language processing and creative AI to turn your feelings and inputs into
          hilarious memes. Whether you choose <strong>Classic</strong>, <strong>Roast Me</strong>, or <strong>Manifest</strong> mode,
          the system adapts to your vibe and creates a unique meme instantly.
        </p>
        <p>
          It is the best tool in 2025 for creating <strong>funny memes with AI</strong>, and it is completely free to use — no account needed.
          Try the <strong>AI meme creator</strong> today and share your personalized meme with friends in seconds!
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default HowToPlay;
