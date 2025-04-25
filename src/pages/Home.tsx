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

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <motion.div
            animate={{
              scale: [1, 1.03, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <picture onClick={() => navigate('/meme')} style={{ cursor: 'pointer', position: 'relative', display: 'inline-block' }}>
              <source srcSet="/assets/funny-robot.webp" type="image/webp" />
              <motion.img
                src="/assets/funny-robot.png"
                alt="Funny Robot Image for AI Meme Generator"
                className="funny-robot"
                initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </picture>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: '18px' }}
          >
            <p style={{
              fontSize: '21px',
              fontWeight: 650,
              color: '#7e22ce',
              textAlign: 'center',
              padding: '0 20px'
            }}>
              👇 Tap the Robot to Instantly Get a Meme That Matches Your Mood; Funny, Roasty, or Totally Random. 
              Try it for free now.
            </p>
            <p style={{
              fontSize: '17px',
              fontWeight: 450,
              color: '#7e22ce',
              textAlign: 'center',
              marginTop: '6px'
            }}>
              No login, no ads, no waiting, just pure meme magic.
            </p>
          </motion.div>
        </div>

        <div className="home-card" style={{ marginTop: '50px' }}>
          <h1 className="home-title">
            <strong>AI Meme Generator</strong> 2025 - Free Create Funny, Roasty, Flavor Memes Instantly!
          </h1>
          <p className="home-subtitle">
            Instantly generate funny, roasty, flavor or motivational memes using AI. No login, no cost, no ads; just laughs. Let's vibe! 🎉
          </p>

          {memeCount !== null && (
            <p className="meme-count-text">
              🎉 <strong>{memeCount.toLocaleString()}</strong> memes generated so far!
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#7e22ce" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/meme')}
            className="start-button"
            style={{
              marginTop: '20px',
              fontSize: '20px',
              padding: '14px 28px',
              backgroundColor: '#9333ea',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '999px',
              transition: 'background-color 0.3s ease'
            }}
          >
            🚀 Generate Your Meme Now
          </motion.button>
        </div>

        <div className="seo-content-block">
          <h2>Create AI-Generated Memes in 2025. Fast, Free, and Viral Meme Maker with AI</h2>
          <p>
            <strong>AI Meme Generator 2025</strong>, your ultimate <strong>free meme maker</strong> powered by artificial intelligence.
            Instantly create <strong>funny</strong>, <strong>motivational</strong>, or <strong>roast-style memes</strong> with just one click.
            No sign-up, no watermark, no hassle; just fast, viral memes for every vibe.
          </p>
          <p>
            Our AI understands humor and emotion, allowing you to create everything from <strong>chaotic Tumblr quotes</strong>
            to <strong>flavor-inspired captions</strong> and even daily <strong>fortune meme messages</strong>.
            Whether you're feeling bold or playful, there is a meme mode that matches your mood.
          </p>
          <p>
            Join thousands who use our <strong>AI-powered meme generator</strong> to express themselves, make friends laugh, or
            just brighten their feed. Try popular modes like <em>Roast</em>, <em>Surprise</em>, <em>Manifest</em>, and the
            exclusive <em>Flavor</em> mode, a whole new way to vibe online.
          </p>
        </div>
      </motion.div>

      <QuestionMark />
      <Footer />
    </>
  );
};

export default Home;