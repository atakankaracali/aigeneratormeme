import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import './styles/intro.css';

type IntroProps = {
  onNext: (
    mode: "classic" | "roast" | "manifest" | "surprise" | "fortune" | "flavor" | "challenge"
  ) => void;
};

const Intro = ({ onNext }: IntroProps) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="intro-container"
  >
    <h2 className="intro-title" aria-label="AI Meme Generator animated title">
      <Typewriter
        words={[
          '😂 AI Meme Generator',
          '🔥 Roast Yourself with AI',
          '💫 Get a Fortune Meme',
          '😎 Meme Your Mood',
          '🚀 Boost Your Vibe Instantly'
        ]}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={50}
        deleteSpeed={50}
      />
    </h2>

    <div className="button-group-section">
      <h3 className="group-heading">🎯 Pick Your Meme Style Below</h3>
      <p className="group-subtext">
        No login, no stress; just one click to unleash a meme made just for your mood. 🧠💥
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button classic-btn"
        onClick={() => onNext("classic")}
      >
        🎨 Classic Mode
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button roast-btn"
        onClick={() => onNext("roast")}
      >
        🥩 Roast Me Mode
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button hr-btn"
        onClick={() => onNext("manifest")}
      >
        🕶 Manifest Mode
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button surprise-btn"
        onClick={() => onNext("surprise")}
      >
        🎲 Surprise Me!
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button fortune-btn"
        onClick={() => onNext("fortune")}
      >
        🔮 Daily Fortune
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button flavor-btn"
        onClick={() => onNext("flavor")}
      >
        🍜 Flavor Mode
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button challenge-btn"
        onClick={() => onNext("challenge")}
      >
        🔥 Today's Challenge
      </motion.button>

    </div>
  </motion.div>
);

export default Intro;