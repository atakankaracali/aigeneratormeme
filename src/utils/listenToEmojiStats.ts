import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const listenToEmojiStats = (
  memeText: string,
  setEmojiCounts: (counts: Record<string, number>) => void
) => {
  const emojiDocRef = doc(db, "emojiStats", memeText);

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