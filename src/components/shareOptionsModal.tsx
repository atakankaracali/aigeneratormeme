import { motion } from "framer-motion";
import "./styles/shareModal.css";
import { RefObject } from "react";
import { downloadStoryImage } from "../utils/storyImage";

interface ShareOptionsModalProps {
  onClose: () => void;
  meme: string;
  memeRef: RefObject<HTMLDivElement>;
}

const ShareOptionsModal = ({ onClose, meme, memeRef }: ShareOptionsModalProps) => {
  const shareOnTwitter = () => {
    const tweetText = `${meme}\n\n🔥 Try the AI Meme Generator: https://aigeneratememe.com`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleInstagramShare = () => {
    if (!memeRef.current) return;
    downloadStoryImage(memeRef);
    alert("📸 Instagram Story image downloaded!\nNow open Instagram and upload it manually.\nDon't forget to tag https://aigeneratememe.com 🚀");
  };

  const handleLinkedInShare = () => {
    navigator.clipboard.writeText(meme);
    alert("💼 LinkedIn: Meme copied to clipboard!\nPaste it in your post and inspire others. You got this 💪");
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://www.aigeneratememe.com/`;
    window.open(linkedInUrl, "_blank");
  };

  return (
    <div className="share-modal-backdrop" onClick={onClose}>
      <motion.div
        className="share-modal"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="share-title">📤 Share Your Meme</h3>
        <p className="share-subtext">Choose a platform and earn your badge!</p>

        <div className="share-button-list">
          <button className="share-option-button twitter" onClick={shareOnTwitter}>
            🐦 Twitter
          </button>
          <button className="share-option-button instagram" onClick={handleInstagramShare}>
            📸 Instagram Story (Download)
          </button>
          <button className="share-option-button linkedin" onClick={handleLinkedInShare}>
            💼 LinkedIn
          </button>
        </div>

        <button className="close-modal-button" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default ShareOptionsModal;