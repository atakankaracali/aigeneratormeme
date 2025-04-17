import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  increment,
  setDoc,
  updateDoc,
  getDoc,
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

    const docSnap = await getDoc(emojiDocRef);
    if (docSnap.exists()) {
      await updateDoc(emojiDocRef, {
        [emoji]: increment(1),
      });
    } else {
      await setDoc(emojiDocRef, {
        [emoji]: 1,
      });
    }

    console.log("📊 Emoji count updated!");
  } catch (err) {
    console.error("❌ Failed to send emoji:", err);
  }
};