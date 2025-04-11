import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/home.css';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        className="home-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <div className="home-card">
          <h1 className="home-title">
            <strong>AI Meme Generator</strong> – Instantly Create Funny, Roasty, Motivational Memes
          </h1>
          <p className="home-subtitle">
            Instantly generate funny, roasty, or motivational memes using AI. No login, no cost — just laughs.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/meme')}
            className="home-button"
          >
            🚀 Try It Now
          </motion.button>
        </div>
      </motion.div>

      <Footer />
    </>
  );
};

export default Home;