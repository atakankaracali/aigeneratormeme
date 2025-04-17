import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const sendEmojiReaction = async (memeText: string, emoji: string) => {
  try {
    await addDoc(collection(db, "emojiReactions"), {
      text: memeText,
      emoji,
      timestamp: serverTimestamp(),
    });
    console.log("✅ Emoji reaction saved!");

    const emojiDocRef = doc(db, "emojiStats", memeText);
    await setDoc(
      emojiDocRef,
      {
        [emoji]: increment(1),
      },
      { merge: true }
    );
    console.log("📊 Emoji count updated!");
  } catch (err) {
    console.error("❌ Failed to send emoji:", err);
  }
};