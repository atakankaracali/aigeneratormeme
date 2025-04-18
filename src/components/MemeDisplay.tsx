import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState, useRef } from "react";
import './styles/memeDisplay.css';
import useWindowSize from 'react-use/lib/useWindowSize';
import { sendEmojiReaction } from '../utils/sendEmojiReaction';
import ShareOptionsModal from "./shareOptionsModal";

interface MemeDisplayProps {
  meme: string;
}

const MemeDisplay = ({ meme }: MemeDisplayProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const memeRef = useRef<HTMLDivElement>(null!)
  const { width, height } = useWindowSize();
  const contentRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(meme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      {showShareModal && (
        <ShareOptionsModal
          onClose={() => setShowShareModal(false)}
          meme={meme}
          memeRef={contentRef}
        />
      )}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="meme-container"
        ref={memeRef}
      >
        <div ref={contentRef} className="meme-export-only">
          <h3 className="meme-title">🔥 Your Meme 🔥</h3>
          <p className="meme-text">{meme}</p>
        </div>
        <div className="button-group">
          <button className="share-button" onClick={() => setShowShareModal(true)}>
            📤 Share
          </button>
          <button onClick={handleCopy} className="copy-button">
            {copied ? "✅ Copied!" : "📋 Copy Meme"}
          </button>
        </div>

        <div className="emoji-reaction-container">
          <p className="emoji-question">How did this meme make you feel?</p>
          <div className="emoji-list">
            {["😂", "😐", "😮", "😢", "🔥"].map((emoji) => {
              const isSelected = selectedEmoji === emoji;

              return (
                <button
                  key={emoji}
                  className={`emoji-button ${isSelected ? "selected" : ""}`}
                  onClick={() => handleEmojiClick(emoji)}
                  disabled={!!selectedEmoji}
                >
                  {emoji}
                </button>
              );
            })}
          </div>

          {selectedEmoji && (
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