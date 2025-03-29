import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import './styles/intro.css';

type IntroProps = { onNext: (mode: "classic" | "roast" | "manifest") => void };

const Intro = ({ onNext }: IntroProps) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="intro-container"
  >
    <h1 className="intro-title">
      <Typewriter
        words={['😂 AI Meme Generator', '🔥 Meme Your Life', '🚀 Boost Your Mood!']}
        loop={0}
        cursor
      />
    </h1>

    <div className="flex flex-col gap-4 items-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button classic-btn"
        onClick={() => onNext("classic")}
      >
        🎨 Classic Mode
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button roast-btn"
        onClick={() => onNext("roast")}
      >
        🥩 Roast Me Mode
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button hr-btn"
        onClick={() => onNext("manifest")}
      >
        🕶 Manifest Mode
      </motion.button>
    </div>
  </motion.div>
);

export default Intro;
