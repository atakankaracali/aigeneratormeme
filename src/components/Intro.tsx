import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import './styles/intro.css';

type IntroProps = {
  onNext: (
    mode: "classic" | "roast" | "manifest" | "surprise" | "fortune"
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
        words={['😂 AI Meme Generator', '🔥 Meme Your Life', '🚀 Boost Your Mood!']}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={50}
        deleteSpeed={50}
      />
    </h2>

    <div className="button-group-section">
      <h3 className="group-heading">🎯 Choose Your Meme Style</h3>
      <p className="group-subtext">Pick your vibe and we will meme it up!</p>
      <motion.button className="intro-button classic-btn" onClick={() => onNext("classic")}>
        🎨 Classic Mode
      </motion.button>
      <motion.button className="intro-button roast-btn" onClick={() => onNext("roast")}>
        🥩 Roast Me Mode
      </motion.button>
      <motion.button className="intro-button hr-btn" onClick={() => onNext("manifest")}>
        🕶 Manifest Mode
      </motion.button>
      <motion.button className="intro-button surprise-btn" onClick={() => onNext("surprise")}>
        🎲 Surprise Me!
      </motion.button>
      <motion.button className="intro-button fortune-btn" onClick={() => onNext("fortune")}>
        🔮 Daily Fortune
      </motion.button>
    </div>
  </motion.div>
);

export default Intro;