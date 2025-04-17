import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { normalizeMemeText } from "./normalizeMemeText";

export const listenToEmojiStats = (
  memeText: string,
  setEmojiCounts: (counts: Record<string, number>) => void
) => {
  const normalized = normalizeMemeText(memeText);
  const emojiDocRef = doc(db, "emojiStats", normalized);

  const unsubscribe = onSnapshot(emojiDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setEmojiCounts(data as Record<string, number>);
    } else {
      setEmojiCounts({});
    }
  });

  return unsubscribe;
};