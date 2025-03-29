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
    <motion.div
      className="loader"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {randomMessage}
    </motion.div>
  );
};

export default Loader;
