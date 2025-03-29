import { useState, useEffect } from 'react';
import axios from 'axios';
import Intro from './components/Intro';
import Question from './components/Question';
import MemeDisplay from './components/MemeDisplay';
import Loader from './components/Loader';
import { motion } from "framer-motion";
import './App.css';

function App() {
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

    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("😂 AI Meme Generator", {
            body: "Ready to create your daily meme?",
            icon: "/icon.png",
          });
        }
      });
    }
  }, []);

  const generateMeme = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5050/generate-meme-text', {
        mode,
        feeling,
        problem,
        lastEnjoyed,
      });

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
    } catch (err) {
      setError('Failed to generate meme.');
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
            title={
              isManifestMode
                ? "What is your biggest dream right now?"
                : "How do you feel today?"
            }
            options={
              isManifestMode
                ? ['Find love', 'Land a dream job', 'Become rich', 'Be truly happy', 'Travel the world']
                : ['Happy', 'Sad', 'Angry', 'Relaxed', 'Tired']
            }
            selected={feeling}
            setSelected={(val) => { setFeeling(val); setStep(2); }}
          />
        )}

        {step === 2 && !isRoastMode && (
          <Question
            title={
              isManifestMode
                ? "What's stopping you from achieving it?"
                : "What's your biggest problem?"
            }
            options={
              isManifestMode
                ? ['Self-doubt', 'Money', 'Bad luck', 'No opportunities', 'Laziness']
                : ['Work', 'HR', 'Life', 'Money', 'Partner', 'School']
            }
            selected={problem}
            setSelected={(val) => { setProblem(val); setStep(3); }}
          />
        )}

        {step === 3 && !isRoastMode && (
          <Question
            title={
              isManifestMode
                ? "How would you feel if it came true tomorrow?"
                : "Last thing you enjoyed?"
            }
            options={
              isManifestMode
                ? ['Empowered', 'Grateful', 'Euphoric', 'Unstoppable', 'Peaceful']
                : ['Movie', 'Food', 'Vacation', 'Partner', 'Friends']
            }
            selected={lastEnjoyed}
            setSelected={(val) => { setLastEnjoyed(val); setStep(4); }}
          />
        )}

        {((step === 1 && isRoastMode && !meme) || (step === 4 && !loading && !meme)) && (
          <>
            <p className="text-title">
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
              className="meme-button secondary"
            >
              🔄 Create Another Meme
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
