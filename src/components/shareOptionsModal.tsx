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

  const handleInstagramShare = () => {
    const instagramText = encodeURIComponent(meme);
    alert(`📸 Instagram: Please paste this meme in your story: "${meme}"`);
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://www.aigeneratememe.com/&summary=${encodeURIComponent(meme)}`;
    window.open(linkedInUrl, "_blank");
  };

  return (
    <div className="share-modal-backdrop" onClick={onClose}>
      <motion.div
        className="share-modal"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>📤 Share Your Meme</h3>
        <p className="share-subtext">Choose a platform to share and earn a badge!</p>

        <div className="share-button-list">
          <button className="share-option-button" onClick={shareOnTwitter}>🐦 Twitter</button>
          <button className="share-option-button" onClick={handleInstagramShare}>📸 Instagram Story</button>
          <button className="share-option-button" onClick={handleLinkedInShare}>💼 LinkedIn</button>
        </div>

        <button className="close-modal-button" onClick={onClose}>Close</button>
      </motion.div>
    </div>
  );
};

export default ShareOptionsModal;