import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import '../styles/stats.css';

const Stats = () => {
    const [memeCount, setMemeCount] = useState<number>(0);
    const [emojiStats, setEmojiStats] = useState<Record<string, number>>({});
    const [modeStats, setModeStats] = useState<Record<string, number>>({});


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/meme-count`)
            .then(res => res.json())
            .then(data => setMemeCount(data.count || 0));

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emoji-leaderboard`)
            .then(res => res.json())
            .then(data => setEmojiStats(data.totals || {}));

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mode-leaderboard`)
            .then(res => res.json())
            .then(data => setModeStats(data || {}));
    }, []);

    const chartData = {
        labels: Object.keys(modeStats),
        datasets: [
            {
                data: Object.values(modeStats),
                backgroundColor: ['#facc15', '#f472b6', '#34d399', '#60a5fa', '#a78bfa', '#fb923c'],
            },
        ],
    };

    return (
        <div className="stats-container">
            <h1>📊 Meme Statistics</h1>

            <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
                <h2>🎉 Total Memes Generated</h2>
                <p className="big-number">{memeCount.toLocaleString()}</p>
            </motion.div>

            <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
                <h2>😂 Top Emoji Reactions</h2>
                <ul>
                    {Object.entries(emojiStats).map(([emoji, count]) => (
                        <li key={emoji}>{emoji}: {count}</li>
                    ))}
                </ul>
            </motion.div>

            <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
                <h2>📈 Meme Mode Popularity</h2>
                <div className="chart-wrapper">
                    <Pie data={chartData} />
                </div>
            </motion.div>
        </div>
    );
};

export default Stats;
