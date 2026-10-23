import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fs from "fs";
import path from "path";
import { sanitizeInput, hasAdvancedInjection, isTooLong } from "./utils/secureInput.js";
import { db } from "./utils/firebaseAdmin.js";
import emojiRouter from "./emojiRoute.js";

dotenv.config();
const app = express();

if (!fs.existsSync("logs")) fs.mkdirSync("logs");

app.use(helmet());
app.use(express.json());

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
app.use(emojiRouter);

function logToFile(ip, data, ua = "") {
  const date = new Date().toISOString().split("T")[0];
  const logLine = `[${new Date().toISOString()}] [${ip}] [${ua}] ${JSON.stringify(data)}\n`;
  const logPath = path.join("logs", `${date}.txt`);
  fs.appendFileSync(logPath, logLine);
}

app.get("/api/mode-stats", async (req, res) => {
  try {
    const snapshot = await db.collection("memeModes").get();
    const result = {};
    snapshot.forEach(doc => {
      result[doc.id] = doc.data().count || 0;
    });
    res.json({ modes: result });
  } catch (error) {
    console.error("🔥 Error fetching meme mode stats:", error);
    res.status(500).json({ error: "Unable to get mode stats" });
  }
});

app.get("/api/emoji-leaderboard", async (req, res) => {
  try {
    const statsRef = db.collection("emojiStats");
    const snapshot = await statsRef.get();
    const totals = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      for (const emoji in data) {
        if (!totals[emoji]) totals[emoji] = 0;
        totals[emoji] += data[emoji];
      }
    });

    res.json({ totals });
  } catch (err) {
    console.error("🔥 Error fetching emoji leaderboard:", err);
    res.status(500).json({ error: "Could not fetch emoji stats" });
  }
});

app.post("/generate-meme-text", async (req, res) => {
  const { feeling, problem, lastEnjoyed, mode } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
  const ua = req.headers["user-agent"] || "unknown";

  const allowedModes = ["classic", "roast", "manifest", "surprise", "fortune", "flavor", "challenge"];
  if (!allowedModes.includes(mode)) {
    return res.status(400).json({ error: "Invalid mode." });
  }

  const modesWithoutInputs = ["roast", "surprise", "fortune", "flavor", "challenge"];
  if (!modesWithoutInputs.includes(mode) && (!feeling || !problem || !lastEnjoyed)) {
    return res.status(400).json({ error: "Missing parameters for this mode" });
  }

  if ([feeling, problem, lastEnjoyed].some((str) => isTooLong(str))) {
    return res.status(400).json({ error: "Input too long" });
  }

  if ([feeling, problem, lastEnjoyed, mode].some((field) => hasAdvancedInjection(field))) {
    logToFile(ip, { warning: "Injection attempt blocked", body: req.body }, ua);
    return res.status(400).json({ error: "Potential prompt injection detected" });
  }

  const modeRef = db.collection("memeModes").doc(mode);
  await db.runTransaction(async (t) => {
    const doc = await t.get(modeRef);
    const current = doc.exists && doc.data()?.count ? doc.data().count : 0;
    t.set(modeRef, { count: current + 1 }, { merge: true });
  });

  const safeFeeling = sanitizeInput(feeling);
  const safeProblem = sanitizeInput(problem);
  const safeLastEnjoyed = sanitizeInput(lastEnjoyed);

  let prompt = "";

  if (mode === "roast") {
    const targets = [
      "sets 7 alarms and snoozes every single one",
      "says 'I'll start on Monday' every week",
      "has 63 browser tabs open and refuses to close any",
      "pays for a gym membership they never use",
      "replies 'haha' without even smiling",
      "watches 3 hours of productivity videos instead of working",
      "orders food while there is food at home",
      "opens the fridge every 10 minutes hoping something new appeared",
      "starts a new side project instead of finishing the old one",
      "checks their phone, puts it down, immediately checks it again",
      "says 'one more episode' at 2am",
      "reads the group chat but never replies",
      "buys books to feel smart and never opens them",
      "rehearses arguments in the shower that will never happen",
      "makes a to-do list just to feel productive and then naps",
    ];
    const formats = [
      "POV: ... (one sharp line)",
      "Nobody: / You: ... (two lines)",
      "Me: ... / Also me: ... (two lines, contradiction)",
      "Top text setup / bottom text punchline (two lines)",
      "A fake 'achievement unlocked' or notification style line",
    ];

    const userTarget =
      safeFeeling || safeProblem || safeLastEnjoyed
        ? `someone who feels ${safeFeeling || "tired"}, struggles with ${safeProblem || "life"}, and last enjoyed ${safeLastEnjoyed || "nothing"}`
        : null;

    const target = userTarget || targets[Math.floor(Math.random() * targets.length)];
    const format = formats[Math.floor(Math.random() * formats.length)];

    prompt = `Write ONE roast meme caption about a person who ${target}.

  This is a MEME, not a stand-up insult. It must read like a viral meme caption on Instagram or Reddit: a specific, relatable situation, then a punchline that exposes them.

  Format to use: ${format}

  Good examples (do not copy, match the energy):
  - POV: you set 7 alarms just to disappoint yourself 7 different times
  - Me: I need to save money / Also me: adds 4 things to cart to get free shipping
  - Nobody: / You at 2am: one more episode wont hurt my career
  - Achievement unlocked: opened the fridge 14 times, found the same cheese 14 times

  Hard bans:
  - No "human equivalent of", "you're like a", "participation trophy", "walking", "the type of person"
  - No similes or comparisons to objects
  - No vague personality insults, roast a SPECIFIC behavior
  - No tech jokes, no politics, nothing racist, sexist or about appearance

  Rules:
  - Max 2 lines, under 25 words
  - English letters only, no emojis
  - Output only the caption, nothing else.`;
  } else if (mode === "manifest") {
    prompt = `You're a startup founder known for creating meme-style motivational quotes that are equal parts hilarious and real. Write ONE caption (max 2 lines) for a hustler who:
- Dreams of: ${safeFeeling}
- Is blocked by: ${safeProblem}
- Would feel: ${safeLastEnjoyed} if they succeed

Style:
- Blend startup pain with hopeful sarcasm
- Use dry humor, internet wisdom, and surprise
- No toxic hustle, just relatable honesty
- Clever and creative.

Rules:
- English only (A-Z), no emojis or symbols
- Output just the meme caption. No extra content.`;
  } else if (mode === "classic") {
    prompt = `You're a master of meme culture. Based on the user's vibe, write ONE short and funny meme caption (max 2 lines) using:
- Mood: ${safeFeeling}
- Problem: ${safeProblem}
- Last thing enjoyed: ${safeLastEnjoyed}

Style:
- Make it relatable
- Add an unexpected twist
- Think Twitter, Tumblr, Reddit humor (clever, ironic, subtle chaos)
- Clever and creative.

Rules:
- English (A-Z only), no emojis or formatting
- No edgy/offensive content
- Just return one witty caption.`;
  } else if (mode === "surprise") {
    prompt = `You are a chaotic creative AI who writes wild and weird meme captions. 
  Your job is to generate ONE short and unexpected meme caption (max 2 lines) that:
  - Makes people say “what the heck did I just read” but still smile
  - Sounds like Gen Z humor or absurd Twitter humor
  - Is witty, ironic, or surreal
  - Does not follow meme templates, but surprises with randomness
  
  Rules:
  - No offensive, political, or inappropriate content
  - No emojis or symbols
  - English only (A-Z)
  - Output only the caption.`;

  } else if (mode === "fortune") {
    prompt = `You are a digital fortune cookie with meme energy.
  Write ONE short fortune-style sentence (1 line only) that:
  - Sounds like a daily wisdom, spiritual advice, or funny truth bomb
  - Has a mysterious, optimistic, or cryptic tone
  - Feels like a message from the universe or horoscope but not cheesy
  
  Examples:
  - “Sometimes, doing nothing is the bravest thing.”
  - “Today you might discover you have always been enough.”
  - “Don't trust the quiet ones. They know too much.”
  
  Rules:
  - No emojis or symbols
  - No explanation or fluff
  - English only (A-Z)
  - Output one single-line caption.`;
  } else if (mode === "flavor") {
    const flavorIntros = [
      "Today's Flavor: chaotic Tumblr wisdom",
      "Today's Flavor: unhinged philosophical nonsense",
      "Today's Flavor: corporate satire meets therapy",
      "Today's Flavor: poetic Twitter with a twist",
      "Today's Flavor: minimalist chaos",
      "Today's Flavor: spiritual sassy truths",
      "Today's Flavor: Gen-Z meets ancient monk",
      "Today's Flavor: your inner voice on espresso",
      "Today's Flavor: Pinterest board on fire",
      "Today's Flavor: therapy, but make it viral"
    ];
    const flavorIntro = flavorIntros[Math.floor(Math.random() * flavorIntros.length)];

    prompt = `You are a viral meme philosopher. Write ONE unique meme caption (max 2 lines) that:
- Embodies the style: "${flavorIntro}"
- Feels chaotic, poetic, unexpected, or emotionally punchy
- Is clever, short, and creative like Tumblr or X (Twitter)
- Could be printed on a sticker, shared as a tweet, or tattooed ironically

Rules:
- English only (A-Z), no emojis or formatting
- No hashtags, no intros
- Just one original, bold meme sentence.`;
  } else if (mode === "challenge") {
    const challengePrompts = [
      { title: "Sunday Scaries Speedrun", instruction: "Create a meme about the anxiety of Sunday night hitting too hard." },
      { title: "Survive Monday (Again)", instruction: "Write a meme about surviving terrible Mondays with dark humor." },
      { title: "Energy-less Tuesday", instruction: "Create a meme about missing energy on Tuesday, with dramatic humor." },
      { title: "Midweek Crisis Club", instruction: "Craft a meme about barely surviving Wednesday with ironic desperation." },
      { title: "Almost Weekend, Almost Alive", instruction: "Make a meme about Thursday fake hopes of the weekend." },
      { title: "Friyay or Fry-day?", instruction: "Generate a meme about emotional burnout clashing with Friday hype." },
      { title: "Weekend Warrior Mode", instruction: "Write a meme about taking wild decisions during the weekend." },
    ];
    const today = new Date().getDay();
    const todayPrompt = challengePrompts[today] || { instruction: "Write a weird meme about surviving the week." };

    prompt = `You are a chaotic but wise meme creator. Your task is:

- ${todayPrompt.instruction}

Rules:
- One short meme caption (max 2 lines)
- English only (A-Z)
- No emojis, hashtags or formatting
- Be witty, chaotic, relatable.

Output: Only the meme sentence, no extra text.`;
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        models: ["anthropic/claude-haiku-5.5", "deepseek/deepseek-v4-flash"],
        temperature: 1.0,
        top_p: 0.95,
        max_tokens: 80,
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

    const memeText = response.data.choices?.[0]?.message?.content?.trim();
    const firstValidLine = memeText
      ?.split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0);

    if (!firstValidLine) throw new Error("AI response missing or invalid");

    const counterRef = db.collection("counters").doc("memes");
    await db.runTransaction(async (t) => {
      const doc = await t.get(counterRef);
      const current = doc.exists && doc.data()?.count ? doc.data().count : 0;
      t.set(counterRef, { count: current + 1 }, { merge: true });
    });

    res.json({ memeText: firstValidLine });
  } catch (error) {
    const detailedError = {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    };

    console.error("❌ OpenRouter Error:", JSON.stringify(detailedError, null, 2));
    res.status(500).json({ error: "AI failed to generate a meme." });
  }
});

app.get("/api/meme-count", async (req, res) => {
  try {
    const counterRef = db.collection("counters").doc("memes");
    const doc = await counterRef.get();
    const count = doc.exists ? doc.data().count : 0;
    res.json({ count });
  } catch (error) {
    console.error("Meme count read error:", error);
    res.status(500).json({ error: "Unable to get meme count." });
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