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
        Turn your thoughts into viral-worthy memes with just a few clicks.
      </motion.p>

      <div className="howto-steps">
        <motion.div className="howto-card" whileHover={{ scale: 1.05 }}>
          <span className="step-number">1️⃣</span>
          <h3>Choose Your Meme Mode</h3>
          <p>
            Pick from 7 unique styles: <strong>Classic</strong>, <strong>Roast Me</strong>, <strong>Manifest</strong>,
            <strong> Surprise</strong>, <strong>Fortune</strong>, <strong>Challange</strong> or <strong>Flavor</strong>. Each mode brings a fresh twist!
          </p>
        </motion.div>

        <motion.div className="howto-card" whileHover={{ scale: 1.05 }}>
          <span className="step-number">2️⃣</span>
          <h3>Answer or Skip Prompts</h3>
          <p>
            Some modes like Classic and Manifest ask how you feel — others like Surprise or Flavor jump straight into meme magic!
          </p>
        </motion.div>

        <motion.div className="howto-card" whileHover={{ scale: 1.05 }}>
          <span className="step-number">3️⃣</span>
          <h3>Generate & React</h3>
          <p>
            Instantly receive your custom meme. Copy, download, share — and don't forget to react with emojis!
          </p>
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
        <h2>What Makes Each Mode Special with AI Meme?</h2>
        <p>
          Looking for the best <strong> I meme generator</strong> in 2025? Our platform lets you create
          <strong> funny memes</strong>, <strong> motivational memes</strong>,
          <strong> roast me memes</strong>, <strong> daily fortunes</strong>, and even
          <strong> flavor-inspired meme captions</strong> - all instantly, using cutting-edge artificial intelligence.
          No login, no cost — just laughs, vibes, and unexpected brilliance.
        </p>
        <ul>
          <li><strong> 🎨 Classic:</strong> Based on your feelings and problems; funny, relatable, witty.</li>
          <li><strong> 🥩 Roast Me:</strong> Savage, sarcastic, Twitter-style roast memes with random “flavor.”</li>
          <li><strong> 🕶 Manifest:</strong> Motivational startup-style captions; ironic and inspiring.</li>
          <li><strong> 🎲 Surprise:</strong> Completely random and chaotic; expect the unexpected!</li>
          <li><strong> 🔮 Fortune:</strong> Daily cosmic advice, cryptic truths, or meme horoscopes.</li>
          <li><strong> 🧠 Flavor:</strong> Pick a meme “flavor” (like Tumblr wisdom or dark irony) and let AI vibe with it.</li>
          <li><strong> 🔥 Challange:</strong> A powerful, funny and moving mood for each day, a meme that will tell you about yourself and show your feelings.</li>
        </ul>
        <p>
          No accounts. No limits. Just you, your mood, and a fire meme delivered by AI. Ready to laugh?
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default HowToPlay;