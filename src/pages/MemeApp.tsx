import { useState, useEffect } from 'react';
import axios from 'axios';
import Intro from '../components/Intro';
import Question from '../components/Question';
import MemeDisplay from '../components/MemeDisplay';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import '../App.css';
import useCanonical from '../hooks/useCanonical';

const forbiddenWords = ["forget", "ignore", "prompt", "as an ai", "jailbroken", "system", "role:", "write me", "act as", "pretend to", "assistant", "developer mode", "simulate"];

function hasInjection(text: string) {
  const lowerText = text.toLowerCase();
  return forbiddenWords.some(word => lowerText.includes(word));
}

const MemeApp = () => {
  useCanonical();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"classic" | "roast" | "manifest" | null>(null);
  const [feeling, setFeeling] = useState('');
  const [problem, setProblem] = useState('');
  const [lastEnjoyed, setLastEnjoyed] = useState('');
  const [meme, setMeme] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [memeHistory, setMemeHistory] = useState<string[]>([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("memeHistory") || "[]");
    setMemeHistory(history);
  }, []);

  const generateMeme = async () => {
    setLoading(true);
    setError('');

    if (mode !== "roast") {
      if ([feeling, problem, lastEnjoyed].some(field => field.length > 100)) {
        setError("Inputs are too long (max 100 characters)");
        setLoading(false);
        return;
      }
      if ([feeling, problem, lastEnjoyed].some(field => hasInjection(field))) {
        setError("Potentially harmful input detected!");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/generate-meme-text`,
        { mode, feeling, problem, lastEnjoyed }
      );

      let memeText = response.data.memeText;
      const ceoNames = [
        "~ Jeff Bozos",
        "~ Elon Must’ve Been High",
        "~ Satya NotGonnaPayYa",
        "~ Mark Suckerborg",
        "~ Bill G8s",
      ];
      const signature = ceoNames[Math.floor(Math.random() * ceoNames.length)];
      memeText += `\n\n${signature}`;

      setMeme(memeText);
      const updatedHistory = [memeText, ...memeHistory].slice(0, 10);
      setMemeHistory(updatedHistory);
      localStorage.setItem("memeHistory", JSON.stringify(updatedHistory));
    } catch (err: any) {
      if (err.response?.status === 429) {
        setError("Too many requests. Slow down!");
      } else if (err.response?.status === 400 || err.response?.status === 403) {
        setError(err.response?.data?.error || "Bad Request");
      } else {
        setError('Failed to generate meme.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStep(0);
    setMode(null);
    setFeeling('');
    setProblem('');
    setLastEnjoyed('');
    setMeme('');
    setError('');
  };

  const handleNextStep = (selectedMode: "classic" | "roast" | "manifest") => {
    setMode(selectedMode);
    setStep(1);
  };

  const isManifestMode = mode === "manifest";
  const isRoastMode = mode === "roast";

  return (
    <div className="app-wrapper">
      <div className="app-card">

        {step === 0 && <Intro onNext={handleNextStep} />}

        {step === 1 && !isRoastMode && (
          <Question
            title={isManifestMode ? "What is your biggest dream right now?" : "How do you feel today?"}
            options={isManifestMode
              ? ['Find love', 'Land a dream job', 'Become rich', 'Be truly happy', 'Travel the world']
              : ['Happy', 'Sad', 'Angry', 'Relaxed', 'Tired']}
            selected={feeling}
            setSelected={(val) => { setFeeling(val); setStep(2); }}
          />
        )}

        {step === 2 && !isRoastMode && (
          <Question
            title={isManifestMode ? "What's stopping you from achieving it?" : "What's your biggest problem?"}
            options={isManifestMode
              ? ['Self-doubt', 'Money', 'Bad luck', 'No opportunities', 'Laziness']
              : ['Work', 'HR', 'Life', 'Money', 'Partner', 'School', 'Manager', 'Unluck']}
            selected={problem}
            setSelected={(val) => { setProblem(val); setStep(3); }}
          />
        )}

        {step === 3 && !isRoastMode && (
          <Question
            title={isManifestMode ? "How would you feel if it came true tomorrow?" : "Last thing you enjoyed?"}
            options={isManifestMode
              ? ['Empowered', 'Grateful', 'Euphoric', 'Unstoppable', 'Peaceful']
              : ['Movie', 'Food', 'Vacation', 'Partner', 'Friends', 'Never', 'Games']}
            selected={lastEnjoyed}
            setSelected={(val) => { setLastEnjoyed(val); setStep(4); }}
          />
        )}

        {((step === 1 && isRoastMode && !meme && !loading) || (step === 4 && !loading && !meme)) && (
          <>
            <p className="text-title text-white mb-4">
              Brutally honest, AI-powered roast. Ready to cry or laugh?
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="meme-button"
              onClick={generateMeme}
            >
              {isRoastMode ? '🥩 Roast Me' : '🚀 Generate Meme'}
            </motion.button>
          </>
        )}

        {loading && <Loader />}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {meme && (
          <>
            <MemeDisplay meme={meme} />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={restart}
              className="restart-button"
            >
              🔄 Create Another Meme
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

export default MemeApp;