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

        <motion.div
          className="example-meme"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ marginBottom: '20px', textAlign: 'center' }}
        >
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>🚀 Just Generated Meme Example:</p>
          <img 
            src="/assets/sample-meme.png" 
            alt="Example Meme" 
            style={{ width: '250px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', cursor: 'pointer' }} 
            onClick={() => navigate('/meme')}
          />
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <picture onClick={() => navigate('/meme')} style={{ cursor: 'pointer', position: 'relative', display: 'inline-block' }}>
            <source srcSet="/assets/funny-robot.webp" type="image/webp" />
            <motion.img
              src="/assets/funny-robot.png"
              alt="Funny Robot Image for AI Meme Generator, best free Meme Generator in 2025, Meme maker with AI."
              className="funny-robot"
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
            <span style={{
              position: 'absolute', 
              bottom: '-20px', 
              width: '100%', 
              textAlign: 'center', 
              fontSize: '16px', 
              color: '#6b21a8', 
              fontWeight: '600'
            }}>
              👉 Tap the Robot to Create Your Meme!
            </span>
          </picture>
        </div>

        <div className="home-card" style={{ marginTop: '50px' }}>
          <h1 className="home-title">
            <strong>AI Meme Generator</strong> 2025 - Create Funny, Roasty, Flavor Memes Instantly!
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/meme')}
            className="start-button"
            style={{ marginTop: '20px', fontSize: '20px', padding: '14px 28px', backgroundColor: '#9333ea', color: '#fff', fontWeight: 'bold', borderRadius: '999px' }}
          >
            🚀 Generate Your First Meme Now!
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