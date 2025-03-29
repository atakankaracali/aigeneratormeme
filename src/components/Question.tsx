import { motion } from "framer-motion";
import './styles/question.css';

type QuestionProps = {
  title: string;
  options: string[];
  selected: string;
  setSelected: (val: string) => void;
};

const Question = ({ title, options, setSelected }: QuestionProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="question-container"
  >
    <h2 className="question-title">{title}</h2>
    <div className="option-group">
      {options.map((option) => (
        <motion.button
          key={option}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected(option)}
          className="option-button"
        >
          {option}
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default Question;
