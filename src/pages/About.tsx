import { motion } from 'framer-motion';
import '../styles/about.css';
import useCanonical from '../hooks/useCanonical';

const About = () => {
  useCanonical();
  return (
    <div className="about-container">
      <motion.h1
        className="about-hero-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        👋 About This Project
      </motion.h1>

      <div className="about-grid">
        <motion.div
          className="about-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>👨‍💻 Creator</h2>
          <p><strong> Hey, I'm Atakan Karacali!</strong></p>
          <p>
            I'm a senior frontend developer based in Europe building fun, creative tools powered by AI.
            This is a passion project — crafted to turn your thoughts into <strong>funny</strong>, <strong>relatable</strong>,
            or downright <strong> chaotic memes</strong> in seconds.
          </p>
          <p>
            Want to collaborate or just say hi? <br />
            Portfolio: <a href="https://atakankaracali.com" target="_blank" rel="noopener noreferrer">atakankaracali.com</a>
          </p>
          <p>
            GitHub: <a href="https://github.com/atakankaracali" target="_blank" rel="noopener noreferrer">github.com/atakankaracali</a>
          </p>
          <p>
            LinkedIn: <a href="https://linkedin.com/in/atakankaracali" target="_blank" rel="noopener noreferrer">in/atakankaracali</a>
          </p>
          <p style={{ fontStyle: 'italic' }}>Thanks for stopping by — and go make some memes! 😎</p>
        </motion.div>

        <motion.div
          className="seo-about-block"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3>About AI Meme Generator</h3>
          <p>
            <strong> AI Meme Generator</strong> is a free meme creation platform powered by OpenAI API and built with love by Atakan Karacali.
            Whether you're looking to laugh, vent, motivate yourself, or just enjoy some weird internet vibes — this tool's got you.
            Launched in April 2025 🚀 | Built with ❤️ by Atakan Karacali
          </p>
          <p>
            Choose from 6 unique meme modes:
            <ul>
              <li><strong> Classic:</strong> Based on your mood and struggles — relatable and funny.</li>
              <li><strong> Roast Me:</strong> Savage, sarcastic, and spicy internet roast vibes with random “flavors.”</li>
              <li><strong> Manifest:</strong> Startup-style motivational meme captions — inspiring but honest.</li>
              <li><strong> Surprise:</strong> Wild, chaotic, unexpected — you never know what you will get.</li>
              <li><strong> Fortune:</strong> Daily fortune-cookie wisdom, AI-style. Cryptic and cute.</li>
              <li><strong> Flavor:</strong> Pick your flavor like “Tumblr wisdom” or “Dark Reddit” and let the AI riff on it.</li>
              <li><strong> Challange:</strong> A powerful, funny and moving mood for each day, a meme that will tell you about yourself and show your feelings.</li>
            </ul>
          </p>
          <p>
            There is no sign-up, no payment — just pure, weird, viral meme energy.
            <strong> Generate, copy, react with emojis, and share!</strong>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;