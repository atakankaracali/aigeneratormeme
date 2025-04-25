import { toCanvas } from "html-to-image";
import { saveAs } from "file-saver";

export const downloadStoryImage = async (targetRef: React.RefObject<HTMLElement>) => {
  if (!targetRef.current) return;

  try {
    const memeCanvas = await toCanvas(targetRef.current, {
      cacheBust: true,
      backgroundColor: "transparent",
      pixelRatio: 2,
      filter: (node) => {
        if (node.tagName === "LINK" && node.getAttribute('href')?.includes('fonts.googleapis.com')) {
          return false;
        }
        return true;
      },
    });

    const storyWidth = 1080;
    const storyHeight = 1920;
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = storyWidth;
    finalCanvas.height = storyHeight;

    const ctx = finalCanvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, storyWidth, storyHeight);
    gradient.addColorStop(0, "#ca98fc");
    gradient.addColorStop(0.5, "#f0abfc");
    gradient.addColorStop(1, "#a5b4fc");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, storyWidth, storyHeight);

    function supportsWebP() {
      return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    const robotImage = new Image();
    robotImage.crossOrigin = "anonymous";
    robotImage.src = supportsWebP()
      ? "/assets/funny-robot.webp"
      : "/assets/funny-robot.png";
    robotImage.onload = () => {
      const logoWidth = 230;
      const logoHeight = 230;
      const logoX = (storyWidth - logoWidth) / 2;
      const logoY = 80;

      ctx.drawImage(robotImage, logoX, logoY, logoWidth, logoHeight);
      
      const safeTop = 250;
      const safeBottom = 170;
      const maxMemeHeight = storyHeight - safeTop - safeBottom - 250;

      const scaleFactor = Math.min(
        (storyWidth * 0.85) / memeCanvas.width,
        maxMemeHeight / memeCanvas.height
      );
      const memeWidth = memeCanvas.width * scaleFactor;
      const memeHeight = memeCanvas.height * scaleFactor;
      const x = (storyWidth - memeWidth) / 2;
      const y = safeTop;

      ctx.drawImage(memeCanvas, x, y, memeWidth, memeHeight);

      ctx.font = "650 48px Arial";
      ctx.fillStyle = "#1f2937";
      ctx.textAlign = "center";
      ctx.fillText("✨ Let's try!", storyWidth / 2, y + memeHeight + 60);

      ctx.font = "bold 50px Arial";
      ctx.fillStyle = "#9333ea";
      ctx.shadowColor = "#00000055";
      ctx.shadowBlur = 6;
      ctx.fillText("aigeneratememe.com", storyWidth / 2, y + memeHeight + 120);

      ctx.font = "normal 40px Arial";
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 0;
      ctx.fillText("Made with ❤️ by Atakan Karacali", storyWidth / 2, storyHeight - 60);

      finalCanvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, "story-meme.png");
        }
      }, "image/png");
    };
  } catch (err) {
    console.error("❌ Story image error:", err);
    alert("Failed to create story image.");
  }
};