import { motion } from "framer-motion";
import './styles/question.css';

type QuestionProps = {
  title: string;
  options: string[];
  selected: string;
  setSelected: (val: string) => void;
};

const Question = ({ title, options, selected, setSelected }: QuestionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="question-container"
  >
    <h3 className="question-title">{title}</h3>

    <div className="option-group">
      {options.map((option) => {
        const isActive = selected === option;

        return (
          <motion.button
            key={option}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(option)}
            className={`option-button ${isActive ? 'selected' : ''}`}
            aria-pressed={isActive}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  </motion.div>
);

export default Question;
