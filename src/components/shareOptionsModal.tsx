import { motion } from "framer-motion";
import "./styles/shareModal.css";
import { RefObject } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

interface ShareOptionsModalProps {
  onClose: () => void;
  meme: string;
  memeRef: RefObject<HTMLDivElement | null>;
}

const ShareOptionsModal = ({ onClose, meme, memeRef }: ShareOptionsModalProps) => {
  const shareOnTwitter = () => {
    const tweetText = `${meme}\n\n🔥 Try the AI Meme Generator: https://aigeneratememe.com`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleInstagramShare = async () => {
    if (!memeRef.current) return;

    try {
      const dataUrl = await toPng(memeRef.current);
      saveAs(dataUrl, "aigenerated-meme.png");
      alert("📸 Meme image downloaded!\nNow share it manually to your Instagram story.\nDon't forget to add: https://aigeneratememe.com 🚀");
    } catch (err) {
      alert("Failed to generate image. Try again.");
      console.error(err);
    }
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://www.aigeneratememe.com/&summary=${encodeURIComponent("🔥 AI Meme Generator 🔥\n" + meme + "\nTry it now: aigeneratememe.com")}`;
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
        <p className="share-subtext">Choose a platform and earn a badge!</p>

        <div className="share-button-list">
          <button className="share-option-button twitter" onClick={shareOnTwitter}>
            🐦 Twitter
          </button>
          <button className="share-option-button instagram" onClick={handleInstagramShare}>
            📸 Instagram Story (download first)
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