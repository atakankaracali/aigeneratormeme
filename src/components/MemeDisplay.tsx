import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState, useRef } from "react";
import './styles/memeDisplay.css';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import useWindowSize from 'react-use/lib/useWindowSize';
import { sendEmojiReaction } from '../utils/sendEmojiReaction';

interface MemeDisplayProps {
  meme: string;
}

const MemeDisplay = ({ meme }: MemeDisplayProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const memeRef = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(meme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!memeRef.current) return;
    toPng(memeRef.current, {
      cacheBust: true,
      backgroundColor: "#ffffff"
    })
      .then((dataUrl) => {
        saveAs(dataUrl, 'meme.png');
      })
      .catch((err) => {
        console.error('❌ PNG Download Error:', err);
        alert("Download failed. Check console.");
      });
  };

  const handleEmojiClick = (emoji: string) => {
    if (selectedEmoji) return;
    sendEmojiReaction(meme, emoji);
    setSelectedEmoji(emoji);
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={350}
          gravity={0.2}
          colors={["#f87171", "#fb923c", "#facc15", "#34d399", "#60a5fa", "#a78bfa"]}
          recycle={false}
          wind={0.01}
          initialVelocityY={5}
        />
      )}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="meme-container"
        ref={memeRef}
      >
        <h3 className="meme-title">🔥 Your Meme 🔥</h3>
        <p className="meme-text">{meme}</p>

        <div className="button-group">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(meme)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tweet-button"
          >
            Tweet your meme!
          </a>

          <button onClick={handleCopy} className="copy-button">
            {copied ? "✅ Copied!" : "📋 Copy Meme"}
          </button>

          <button onClick={handleDownload} className="download-button">
            📥 Download PNG
          </button>
        </div>

        <div className="emoji-reaction-container">
          <p>How did this meme make you feel?</p>

          {!selectedEmoji ? (
            <div className="emoji-list">
              {["😂", "😐", "😮", "😢", "🔥"].map((emoji) => (
                <button
                  key={emoji}
                  className="emoji-button"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          ) : (
            <motion.p
              className="thanks-text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Thanks for your feedback! 💜
            </motion.p>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default MemeDisplay;