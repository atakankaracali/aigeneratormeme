export const fetchEmojiStats = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emoji-leaderboard`);
    const data = await res.json();
    return data.totals;
  };  