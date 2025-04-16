import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState, useRef } from "react";
import './styles/memeDisplay.css';
import { toPng, toSvg } from 'html-to-image';
import { saveAs } from 'file-saver';
import useWindowSize from 'react-use/lib/useWindowSize';

interface MemeDisplayProps {
  meme: string;
}

type ExportMode = 'png' | 'svg';

const MemeDisplay = ({ meme }: MemeDisplayProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);
  const [exportMode, setExportMode] = useState<ExportMode>('svg');
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

    if (exportMode === 'png') {
      toPng(memeRef.current, { cacheBust: true, backgroundColor: '#ffffff' })
        .then((dataUrl) => {
          saveAs(dataUrl, 'meme.png');
        })
        .catch((err) => {
          console.error('❌ PNG Download Error:', err);
          alert("PNG format is not downloaded. Check the console.");
        });
    } else {
      toSvg(memeRef.current, { cacheBust: true, backgroundColor: '#ffffff' })
        .then((svgString) => {
          if (!svgString.startsWith("<svg")) {
            console.error("⛔ SVG not valid:", svgString);
            alert("The SVG format is invalid, please try again.");
            return;
          }

          const blob = new Blob([svgString], { type: 'image/svg+xml' });
          saveAs(blob, 'meme.svg');
        })
        .catch((err) => {
          console.error("❌ SVG Download Error:", err);
          alert("SVG format download failed. Check console.");
        });
    }
  };

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
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
            📥 Download as {exportMode.toUpperCase()}
          </button>

          <button onClick={() => setExportMode(exportMode === 'png' ? 'svg' : 'png')} className="export-toggle-button">
            🔁 Export Mode: {exportMode.toUpperCase()}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default MemeDisplay;