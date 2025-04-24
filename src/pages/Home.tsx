import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/home.css';
import Footer from '../components/Footer';
import QuestionMark from '../components/QuestionMark';

const Home = () => {
  const navigate = useNavigate();
  const [memeCount, setMemeCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/meme-count`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === 'number') {
          setMemeCount(data.count);
        }
      })
      .catch(() => setMemeCount(null));
  }, []);

  return (
    <>
      <motion.div
        className="home-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <picture>
          <source srcSet="/assets/funny-robot.webp" type="image/webp" />
          <motion.img
            src="/assets/funny-robot.png"
            alt="Funny Robot Image for AI Meme Generator, best free Meme Generator in 2025"
            className="funny-robot"
            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </picture>

        <div className="home-card">
          <h1 className="home-title">
            <strong>AI Meme Generator</strong> - Instantly Create Funny, Roasty, Flavor Memes Using AI
          </h1>
          <p className="home-subtitle">
            Instantly generate funny, roasty, flavor or motivational memes using AI. No login, no cost, no ads; just laughs.
          </p>

          {memeCount !== null && (
            <p className="meme-count-text">
              🎉 <strong>{memeCount.toLocaleString()}</strong> memes generated so far!
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/meme')}
            className="start-button"
          >
            🚀 Try It Now
          </motion.button>
        </div>

        <div className="seo-content-block">
          <h2>Why Choose Our AI Meme Generator?</h2>
          <p>
            Looking for the best <strong> AI meme generator</strong> in 2025? Our platform lets you create
            <strong> funny memes</strong>, <strong> motivational memes</strong>,
            <strong> roast me memes</strong>, <strong> daily fortunes</strong>, and even
            <strong> flavor-inspired meme captions</strong> — all instantly, using cutting-edge artificial intelligence.
            No login, no cost — just laughs, vibes, and unexpected brilliance.
          </p>
          <p>
            Whether you're in the mood for a chaotic roast, a Tumblr-style quote, or a feel-good fortune, our
            <strong> meme creator AI</strong> has you covered. Built for speed, fun, and creativity — it's the perfect
            tool for anyone who wants a fast, free meme maker without sign-ups or boring templates.
          </p>
          <p>
            Join thousands already using our <strong> viral meme generator</strong> to share laughs, express their mood,
            and unleash meme magic. Try modes like <em>Classic</em>, <em>Roast</em>, <em>Manifest</em>, <em>Surprise</em>,
            <em>Fortune</em>, and the all-new <em>Flavor</em> mode for a meme experience you have never seen before.
          </p>
        </div>
      </motion.div>
      <QuestionMark />

      <Footer />
    </>
  );
};

export default Home;