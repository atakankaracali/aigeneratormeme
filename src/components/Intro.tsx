import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import './styles/intro.css';

type IntroProps = { onNext: (mode: "classic" | "roast" | "manifest") => void };

const Intro = ({ onNext }: IntroProps) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="intro-container"
  >
    <h2 className="intro-title" aria-label="AI Meme Generator animated title">
      <Typewriter
        words={['😂 AI Meme Generator', '🔥 Meme Your Life', '🚀 Boost Your Mood!']}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={50}
        deleteSpeed={30}
      />
    </h2>

    <div className="flex flex-col gap-4 items-center mt-4 w-full">
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
