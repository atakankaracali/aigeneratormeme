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
          <p><strong>Hey, I'm Atakan Karacali!</strong></p>
          <p>I'm a senior frontend developer based in Europe building fun AI-powered web tools.
            This project is a weekend passion project to bring you laughs, motivation,
            or brutal truths, all with memes 🤖✨</p>
          <p>
            Want to collaborate or say hi? <br />
            Portfolio: <a href="https://atakankaracali.com" target="_blank">atakankaracali.com</a>
          </p>
          <p>
            GitHub: <a href="https://github.com/atakankaracali" target="_blank">github.com/atakankaracali</a>
          </p>
          <p>
            Linkedin: <a href="https://linkedin.com/in/atakankaracali" target="_blank">in/atakankaracali</a>
          </p>
          <p style={{ fontStyle: 'italic' }}>Thanks for stopping by! 😊</p>
        </motion.div>

        <div className="seo-about-block">
          <h3>About AI Meme Generator</h3>
          <p>
            AI Meme Generator is a free online tool created by Atakan Karacali — a frontend developer passionate about AI and creative web tools.
            This platform helps users easily create <strong>funny memes</strong>, <strong>motivational AI memes</strong>, or even <strong>brutal roast memes</strong> using artificial intelligence.
          </p>
          <p>
            Whether you're a meme lover, a social media content creator, or just here for fun,
            our <strong>AI-powered meme generator</strong> delivers quick and entertaining results without any sign-up.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;