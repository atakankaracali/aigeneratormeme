import { motion } from "framer-motion";
import "./styles/shareModal.css";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

interface ShareOptionsModalProps {
  onClose: () => void;
  meme: string;
  memeRef: React.RefObject<HTMLDivElement | null>;
}

const ShareOptionsModal = ({ onClose, meme, memeRef }: ShareOptionsModalProps) => {
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(meme)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleInstagramShare = async () => {
    if (!memeRef.current) return;
    try {
      const dataUrl = await toPng(memeRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        width: 1080,
        height: 1920,
      });
      saveAs(dataUrl, "meme-instagram.png");
      alert("✅ Meme saved!\nNow open Instagram → Create Story → Upload your meme!");
    } catch (err) {
      console.error("❌ Instagram Story error:", err);
      alert("Download failed. Please try again.");
    }
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