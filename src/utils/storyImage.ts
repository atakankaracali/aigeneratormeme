import { toCanvas } from "html-to-image";
import { saveAs } from "file-saver";

export const downloadStoryImage = async (targetRef: React.RefObject<HTMLElement>) => {
  if (!targetRef.current) return;

  try {
    const memeCanvas = await toCanvas(targetRef.current, {
      cacheBust: true,
      backgroundColor: "transparent",
      pixelRatio: 2,
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

    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("aigeneratememe.com", storyWidth / 2, 100);

    const scaleFactor = Math.min(
      (storyWidth * 0.85) / memeCanvas.width,
      (storyHeight * 0.6) / memeCanvas.height
    );
    const memeWidth = memeCanvas.width * scaleFactor;
    const memeHeight = memeCanvas.height * scaleFactor;
    const x = (storyWidth - memeWidth) / 2;
    const y = 200;

    ctx.drawImage(memeCanvas, x, y, memeWidth, memeHeight);

    ctx.font = "600 42px Arial";
    ctx.fillStyle = "#1e1e1e";
    ctx.textAlign = "center";
    ctx.fillText("✨ Let's try!", storyWidth / 2, y + memeHeight + 60);

    ctx.font = "normal 26px Arial";
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.textAlign = "center";
    ctx.fillText("Made with ❤️ by Atakan Karacali", storyWidth / 2, storyHeight - 60);

    finalCanvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, "story-meme.png");
      }
    }, "image/png");
  } catch (err) {
    console.error("❌ Story image error:", err);
    alert("Failed to create story image.");
  }
};