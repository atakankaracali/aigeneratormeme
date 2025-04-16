import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fs from "fs";
import path from "path";
import { sanitizeInput, hasAdvancedInjection, isTooLong } from "./utils/secureInput.js";

dotenv.config();
const app = express();

if (!fs.existsSync("logs")) fs.mkdirSync("logs");

const counterPath = path.join("utils", "memeCounter.json");

app.use(helmet());
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
});

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /^https?:\/\/(www\.)?aigeneratememe\.com$/.test(origin)
      ) {
        return callback(null, true);
      }
      callback(new Error("CORS not allowed"));
    },
    optionsSuccessStatus: 200,
  })
);

const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  keyGenerator: (req) =>
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown",
  message: "❌ Too many requests from this IP, slow down.",
});
app.use(limiter);

function logToFile(ip, data, ua = "") {
  const date = new Date().toISOString().split("T")[0];
  const logLine = `[${new Date().toISOString()}] [${ip}] [${ua}] ${JSON.stringify(data)}\n`;
  const logPath = path.join("logs", `${date}.txt`);
  fs.appendFileSync(logPath, logLine);
}

app.post("/generate-meme-text", async (req, res) => {
  const { feeling, problem, lastEnjoyed, mode } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
  const ua = req.headers["user-agent"] || "unknown";

  const allowedModes = ["classic", "roast", "manifest"];
  if (!allowedModes.includes(mode)) {
    return res.status(400).json({ error: "Invalid mode." });
  }

  if (mode !== "roast" && (!feeling || !problem || !lastEnjoyed)) {
    return res.status(400).json({ error: "Missing parameters for non-roast mode" });
  }

  if ([feeling, problem, lastEnjoyed].some((str) => isTooLong(str))) {
    return res.status(400).json({ error: "Input too long" });
  }

  if ([feeling, problem, lastEnjoyed, mode].some((field) => hasAdvancedInjection(field))) {
    logToFile(ip, { warning: "Injection attempt blocked", body: req.body }, ua);
    return res.status(400).json({ error: "Potential prompt injection detected" });
  }

  const safeFeeling = sanitizeInput(feeling);
  const safeProblem = sanitizeInput(problem);
  const safeLastEnjoyed = sanitizeInput(lastEnjoyed);

  let prompt = "";

  if (mode === "roast") {
    prompt = `You are a clever, dark-humored internet comedian. Write ONE short and savage roast-style meme caption (max 2 lines). It should be smart, unexpected, ironic. No intros or formatting.`;
  } else if (mode === "manifest") {
    prompt = `You're a founder who makes savage motivational meme quotes. Write ONE caption (max 2 lines) for someone who dreams of ${safeFeeling}, blocked by ${safeProblem}, and would feel ${safeLastEnjoyed} if they succeed. Dry humor, startup pain, no emojis.`;
  } else if (mode === "classic") {
    prompt = `You're a meme wizard. Based on mood: ${safeFeeling}, problem: ${safeProblem}, and last enjoyed: ${safeLastEnjoyed}, write ONE short and funny meme caption (max 2 lines). Make it relatable, ironic, clever.`;
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://www.aigeneratememe.com",
          "X-Title": "AI Generate Meme",
        },
      }
    );
    console.log("🔥 RAW RESPONSE from OpenRouter:");
    console.log(JSON.stringify(response.data, null, 2));

    const memeText = response.data.choices?.[0]?.message?.content?.trim();
    const firstValidLine = memeText
      ?.split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0);

    if (!firstValidLine) throw new Error("AI response missing or invalid");

    try {
      const data = JSON.parse(fs.readFileSync(counterPath, "utf8"));
      data.count += 1;
      fs.writeFileSync(counterPath, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Meme count update failed:", err.message);
    }

    res.json({ memeText: firstValidLine });
  } catch (error) {
    const detailedError = {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    };

    console.error("❌ OpenRouter Error:", JSON.stringify(detailedError, null, 2));
    logToFile(ip, { error: detailedError }, ua);
    res.status(500).json({ error: "AI failed to generate a meme." });
  }
});

app.get("/api/meme-count", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(counterPath, "utf8"));
    res.json({ count: data.count });
  } catch (error) {
    console.error("Meme count read error:", error);
    res.status(500).json({ error: "Unable to get meme count." });
  }
});

app.post("/api/meme-count", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(counterPath, "utf8"));
    data.count += 1;
    fs.writeFileSync(counterPath, JSON.stringify(data, null, 2));
    res.json({ success: true, newCount: data.count });
  } catch (error) {
    console.error("Meme count write error:", error);
    res.status(500).json({ error: "Unable to update meme count." });
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Backend Working! API is active.");
});

app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🔥 Backend running: http://0.0.0.0:${PORT}`));