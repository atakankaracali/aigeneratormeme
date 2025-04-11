import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/notfound.css';

const NotFound = () => {
  return (
    <motion.div
      className="notfound-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="notfound-title">😵 404 : Meme Not Found</h1>
      <p className="notfound-text">
        Looks like this meme ran away... But hey, you can always generate a new one!
      </p>
      <Link to="/" className="notfound-button">← Back to Home</Link>
    </motion.div>
  );
};

export default NotFound;
