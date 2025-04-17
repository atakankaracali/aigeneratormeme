import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const listenToEmojiStats = (
  memeText: string,
  callback: (data: Record<string, number>) => void
) => {
  const docRef = doc(db, "emojiStats", memeText);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as Record<string, number>);
    }
  });
};