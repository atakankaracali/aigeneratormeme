import { motion } from "framer-motion";
import "./styles/shareModal.css";

interface ShareOptionsModalProps {
  onClose: () => void;
  meme: string;
}

const ShareOptionsModal = ({ onClose, meme }: ShareOptionsModalProps) => {
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(meme)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnInstagram = () => {
    alert("📸 Instagram Story sharing is coming soon!");
  };

  const shareOnLinkedIn = () => {
    alert("💼 LinkedIn sharing is coming soon!");
  };

  return (
    <div className="share-modal-backdrop" onClick={onClose}>
      <motion.div
        className="share-modal"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="share-title">📤 Share Your Meme</h3>
        <p className="share-subtext">Choose a platform to share & earn your badge!</p>

        <div className="share-button-list">
          <button className="share-option-button twitter" onClick={shareOnTwitter}>
            🐦 Twitter
          </button>
          <button className="share-option-button instagram" onClick={shareOnInstagram}>
            📸 Instagram Story
          </button>
          <button className="share-option-button linkedin" onClick={shareOnLinkedIn}>
            💼 LinkedIn
          </button>
        </div>

        <button className="close-modal-button" onClick={onClose}>
          ✖️ Close
        </button>
      </motion.div>
    </div>
  );
};

export default ShareOptionsModal;