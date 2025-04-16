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
        <motion.img
          src="/assets/funny-robot.png"
          alt="Funny Robot"
          className="funny-robot"
          initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        <div className="home-card">
          <h1 className="home-title">
            <strong>AI Meme Generator</strong> – Instantly Create Funny, Roasty, Motivational Memes
          </h1>
          <p className="home-subtitle">
            Instantly generate funny, roasty, or motivational memes using AI. No login, no cost — just laughs.
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
            className="home-button"
          >
            🚀 Try It Now
          </motion.button>
        </div>

        <div className="seo-content-block">
          <h2>Why Choose Our AI Meme Generator?</h2>
          <p>
            Looking for the best <strong>AI meme generator</strong> in 2025? Our platform lets you create <strong>funny memes</strong>,
            <strong> motivational memes</strong>, and hilarious <strong>roast me memes</strong> instantly with artificial intelligence.
            Perfect for anyone who wants a fast, free meme maker without sign-ups or complicated tools.
          </p>
          <p>
            Join thousands who are using our <strong>meme creator AI</strong> to share laughs, inspire friends, or just have fun online.
            Whether you're into <strong>AI humor tools</strong> or just want to try the latest <strong>viral meme generator</strong>,
            we have got you covered.
          </p>
        </div>
      </motion.div>
      <QuestionMark />

      <Footer />
    </>
  );
};

export default Home;