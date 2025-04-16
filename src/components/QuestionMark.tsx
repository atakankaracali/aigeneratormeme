import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import './styles/questionMark.css';

const QuestionMark = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="question-mark-home"
      whileHover={{ rotate: [0, 10, -10, 0], scale: 1.2 }}
      onClick={() => navigate('/how-to-play')}
    >
      <HelpCircle size={40} strokeWidth={2.5} color="#7c3aed" />
    </motion.div>
  );
};

export default QuestionMark;