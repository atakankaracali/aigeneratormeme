import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

function getChallengeInfo() {
  const days = [
    { title: "Sunday Scaries Speedrun", subtitle: "Try not to think about Monday. You just did." },
    { title: "Survive Monday (Again)", subtitle: "You survived worse. Probably. Maybe. Barely." },
    { title: "Taco-less Tuesday", subtitle: "Pretend you are thriving... without tacos." },
    { title: "Midweek Crisis Club", subtitle: "You are halfway dead. Congrats!" },
    { title: "Almost Weekend, Almost Alive", subtitle: "Manifest weekend. Mentally, you are already drunk." },
    { title: "Friyay or Fry-day?", subtitle: "Work died. Soul revived. Party time?" },
    { title: "Weekend Warrior Mode", subtitle: "Do something crazy. Like, go outside maybe." }
  ];
  const today = new Date().getDay();
  return days[today] || { title: "Challenge Mode", subtitle: "Let's create something weird!" };
}

const MemeApp = () => {
  useCanonical();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"classic" | "roast" | "manifest" | "surprise" | "fortune" | "flavor" | "challenge" | null>(null);
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

  useEffect(() => {
    if (step !== 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [step]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const autoMode = params.get('autoMode') as "surprise" | "flavor" | null;

    if (autoMode) {
      setMode(autoMode);
      setStep(1);
    }
  }, []);

  useEffect(() => {
    if ((mode === 'surprise' || mode === 'flavor') && step === 1) {
      setTimeout(() => {
        generateMeme();
        setStep(99);
      }, 500);
    }
  }, [mode, step]);

  const generateMeme = async () => {
    setLoading(true);
    setError('');

    const isFreeMode = ["roast", "surprise", "fortune", "flavor", "challenge"].includes(mode || "");
    const inputs = [feeling, problem, lastEnjoyed];

    if (!isFreeMode && inputs.some(field => field.length > 100)) {
      setError("Inputs are too long (max 100 characters)");
      setLoading(false);
      return;
    }

    if (!isFreeMode && inputs.some(field => hasInjection(field))) {
      setError("Potentially harmful input detected!");
      setLoading(false);
      return;
    }

    const startTime = Date.now();

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

      const updatedHistory = [memeText, ...memeHistory].slice(0, 10);
      setMeme(memeText);
      setMemeHistory(updatedHistory);
      localStorage.setItem("memeHistory", JSON.stringify(updatedHistory));

      const elapsed = Date.now() - startTime;
      const minimumLoadingTime = 1400;
      if (elapsed < minimumLoadingTime) {
        setTimeout(() => {
          setLoading(false);
        }, minimumLoadingTime - elapsed);
      } else {
        setLoading(false);
      }

    } catch (err: any) {
      if (err.response?.status === 429) {
        setError("Too many requests. Slow down!");
      } else if (err.response?.status === 400 || err.response?.status === 403) {
        setError(err.response?.data?.error || "Bad Request");
      } else {
        setError('Failed to generate meme.');
      }
      console.error(err);
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

  const handleNextStep = (selectedMode: typeof mode) => {
    setMode(selectedMode);
    setStep(1);
  };

  const isFreeMode = ["roast", "surprise", "fortune", "flavor", "challenge"].includes(mode!);
  const isManifestMode = mode === "manifest";

  const shouldShowGenerateScreen =
    (isFreeMode && step === 1 && !meme && !loading) ||
    (!isFreeMode && step === 4 && !meme && !loading);

  const challengeInfo = getChallengeInfo();

  return (
    <div className="app-wrapper">
      <div className="app-card">

        {step === 0 && <Intro onNext={handleNextStep} />}

        {step === 1 && mode === "challenge" && (
          <>
            <p className="text-title text-white mb-4">
              🎯 Today’s Challenge: {challengeInfo.title}
            </p>
            <p className="text-white mb-6" style={{ fontSize: '18px' }}>
              {challengeInfo.subtitle}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="meme-button"
              onClick={() => {
                generateMeme();
                setStep(99);
              }}
            >
              🚀 Start Today's Challenge
            </motion.button>
          </>
        )}

        {step === 1 && !isFreeMode && (
          <Question
            title={isManifestMode ? "What is your biggest dream right now?" : "How do you feel today?"}
            options={isManifestMode
              ? ['Find love', 'Land a dream job', 'Become rich', 'Be truly happy', 'Travel the world']
              : ['Happy', 'Sad', 'Angry', 'Relaxed', 'Tired', 'Stressed', 'Motivated']}
            selected={feeling}
            setSelected={(val) => { setFeeling(val); setStep(2); }}
          />
        )}

        {step === 2 && !isFreeMode && (
          <Question
            title={isManifestMode ? "What's stopping you from achieving it?" : "What's your biggest problem?"}
            options={isManifestMode
              ? ['Self-doubt', 'Money', 'Bad luck', 'No opportunities', 'Laziness']
              : ['Work', 'HR', 'Life', 'Money', 'Partner', 'School', 'Manager', 'Unluck']}
            selected={problem}
            setSelected={(val) => { setProblem(val); setStep(3); }}
          />
        )}

        {step === 3 && !isFreeMode && (
          <Question
            title={isManifestMode ? "How would you feel if it came true tomorrow?" : "Last thing you enjoyed?"}
            options={isManifestMode
              ? ['Empowered', 'Grateful', 'Euphoric', 'Unstoppable', 'Peaceful']
              : ['Movie', 'Food', 'Vacation', 'Partner', 'Friends', 'Never', 'Games']}
            selected={lastEnjoyed}
            setSelected={(val) => { setLastEnjoyed(val); setStep(4); }}
          />
        )}

        {shouldShowGenerateScreen && mode !== "challenge" && (
          <>
            <p className="text-title text-white mb-4">
              {mode === "roast" && "Brutally honest, AI-powered roast. Ready to cry or laugh?"}
              {mode === "surprise" && "Expect the unexpected 👀"}
              {mode === "fortune" && "🌸 Your daily cosmic message is waiting..."}
              {mode === "flavor" && "Today’s flavor will surprise you 🍜"}
              {mode === "classic" && "Let’s create a meme based on your mood 🎨"}
              {mode === "manifest" && "Crafting your motivational meme... 💼"}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="meme-button"
              onClick={() => {
                generateMeme();
                setStep(99);
              }}
            >
              🚀 Generate Meme
            </motion.button>
          </>
        )}

        {loading && step === 99 && <Loader />}

        {meme && (
          <>
            <MemeDisplay meme={meme} />
            <div className="meme-actions">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={restart}
                className="restart-button"
              >
                🔄 Create Another Meme
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="home-button"
              >
                🏠 Go to Home Page
              </motion.button>
            </div>
          </>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default MemeApp;