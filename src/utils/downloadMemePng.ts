import { toCanvas } from "html-to-image";
import { saveAs } from "file-saver";

export const downloadMemePng = async (targetRef: React.RefObject<HTMLElement>) => {
  if (!targetRef?.current) {
    alert("Meme not ready to download.");
    return;
  }

  let memeCanvas: HTMLCanvasElement;

  try {
    memeCanvas = await toCanvas(targetRef.current, {
      cacheBust: true,
      backgroundColor: "transparent",
      pixelRatio: 2,
      filter: (node) => {
        if (node.tagName === "LINK" && node.getAttribute("href")?.includes("fonts.googleapis.com")) {
          return false;
        }

        if (node.tagName === "STYLE") {
          return false;
        }

        try {
          if ((node as HTMLStyleElement).sheet?.cssRules) {
            return true;
          }
        } catch {
          return false;
        }

        return true;
      },
    });

    if (!memeCanvas || !(memeCanvas instanceof HTMLCanvasElement)) {
      alert("Meme canvas could not be generated.");
      return;
    }
  } catch {
    alert("Something went wrong while creating meme image.");
    return;
  }

  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f0abfc");
  gradient.addColorStop(1, "#a5b4fc");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  function supportsWebP() {
    return document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }

  const robotImage = new Image();
  robotImage.crossOrigin = "anonymous";
  robotImage.src = supportsWebP()
    ? "/assets/funny-robot.webp"
    : "/assets/funny-robot.png";

  robotImage.onload = () => {
    const logoWidth = 230;
    const logoHeight = 230;
    const logoX = (width - logoWidth) / 2;
    const logoY = 80;

    ctx.drawImage(robotImage, logoX, logoY, logoWidth, logoHeight);

    ctx.font = "bold 42px Arial";
    ctx.fillStyle = "#1e1e1e";
    ctx.textAlign = "center";
    ctx.fillText("✨ Let's try!", width / 2, height - 150);

    ctx.font = "bold 40px Arial";
    ctx.fillStyle = "#4c1d95";
    ctx.shadowColor = "#00000033";
    ctx.shadowBlur = 6;
    ctx.fillText("aigeneratememe.com", width / 2, height - 80);

    ctx.font = "normal 32px Arial";
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 0;
    ctx.fillText("Made with ❤️ by Atakan Karacali", width / 2, height - 40);

    const safeTop = 340;
    const safeBottom = 200;
    const scaleFactor = Math.min(
      (width * 0.9) / memeCanvas.width,
      (height - safeTop - safeBottom) / memeCanvas.height
    );
    const memeWidth = memeCanvas.width * scaleFactor;
    const memeHeight = memeCanvas.height * scaleFactor;
    const x = (width - memeWidth) / 2;
    const y = safeTop;

    ctx.drawImage(memeCanvas, x, y, memeWidth, memeHeight);

    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, "meme.png");
      } else {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "meme.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, "image/png");
  };

  robotImage.onerror = () => {
    alert("Failed to load robot image.");
  };
};