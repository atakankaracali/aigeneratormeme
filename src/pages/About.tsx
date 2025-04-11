import { motion } from 'framer-motion';
import '../styles/about.css';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="about-container">
      <motion.div
        className="about-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>👨‍💻 Creator</h2>
        <p><strong>Hey, I'm Atakan!</strong></p>
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

      <Footer />
    </div>
  );
};

export default About;
