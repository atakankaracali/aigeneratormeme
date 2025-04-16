import { motion } from 'framer-motion';
import './styles/loader.css';

const Loader = () => {
  const messages = [
    "🤖 AI is thinking...",
    "🔥 Creating the best meme ever...",
    "💡 Consulting meme experts...",
    "🚀 Meme cooking in progress..."
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="loading-brain-wrapper">
      <motion.div
        className="brain"
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
      >
        🧠
      </motion.div>

      <motion.p
        className="loading-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {randomMessage}
      </motion.p>
    </div>
  );
};

export default Loader;
