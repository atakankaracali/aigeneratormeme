import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import './styles/intro.css';

type IntroProps = { onNext: (mode: "classic" | "roast" | "manifest") => void };

const Intro = ({ onNext }: IntroProps) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="intro-container px-4 sm:px-6 md:px-8"
  >
    <h2 className="intro-title text-2xl sm:text-3xl font-semibold text-white text-center mb-4" aria-label="AI Meme Generator Tagline">
      <Typewriter
        words={['😂 AI Meme Generator', '🔥 Meme Your Life', '🚀 Boost Your Mood!']}
        loop={0}
        cursor
      />
    </h2>

    <p className="text-center text-white text-base sm:text-lg max-w-md mx-auto mb-6">
      Choose a meme mode and let our AI turn your emotions into funny, clever, or brutally honest captions. Fast, free, and fun.
    </p>

    <div className="flex flex-col gap-4 items-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button classic-btn"
        onClick={() => onNext("classic")}
        title="Start Classic Mode"
      >
        🎨 Classic Mode
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button roast-btn"
        onClick={() => onNext("roast")}
        title="Start Roast Me Mode"
      >
        🥩 Roast Me Mode
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="intro-button hr-btn"
        onClick={() => onNext("manifest")}
        title="Start Manifest Mode"
      >
        🕶 Manifest Mode
      </motion.button>
    </div>
  </motion.div>
);

export default Intro;
