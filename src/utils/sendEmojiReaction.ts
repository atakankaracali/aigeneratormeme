import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const sendEmojiReaction = async (memeText: string, emoji: string) => {
  try {
    await addDoc(collection(db, "emojiReactions"), {
      text: memeText,
      emoji,
      timestamp: serverTimestamp(),
    });
    console.log("✅ Emoji reaction saved!");
  } catch (err) {
    console.error("❌ Failed to send emoji:", err);
  }
};
