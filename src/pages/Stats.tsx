import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../styles/stats.css';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Stats = () => {
    const navigate = useNavigate();
    const [memeCount, setMemeCount] = useState<number>(0);
    const [emojiStats, setEmojiStats] = useState<Record<string, number>>({});
    const [modeStats, setModeStats] = useState<Record<string, number>>({});

    const colorMap: Record<string, string> = {
        challenge: '#facc15',
        classic: '#f472b6',
        flavor: '#34d399',
        fortune: '#60a5fa',
        manifest: '#a78bfa',
        roast: '#fb923c',
        surprise: '#fbbf24',
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/meme-count`)
            .then(res => res.json())
            .then(data => setMemeCount(data.count || 0));

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emoji-leaderboard`)
            .then(res => res.json())
            .then(data => setEmojiStats(data.totals || {}));

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mode-stats`)
            .then(res => res.json())
            .then(data => setModeStats(data.modes || {}));
    }, []);

    const total = Object.values(modeStats).reduce((acc, val) => acc + val, 0);

    const chartData = {
        labels: Object.keys(modeStats),
        datasets: [
            {
                data: Object.values(modeStats),
                backgroundColor: Object.keys(modeStats).map(mode => colorMap[mode] || '#ddd'),
                borderColor: '#fff',
                borderWidth: 2,
                hoverOffset: 10,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 600,
                    size: 14,
                },
                formatter: (value: number) => {
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.label || '';
                        const value = context.parsed;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#4a00e0',
                    font: {
                        weight: 600,
                    },
                    padding: 12,
                },
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
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
                    <Pie data={chartData} options={chartOptions} />
                </div>
                <div className="top-modes">
                    <h3 className="top-modes-title">🏆 Top 3 Meme Modes</h3>
                    <div className="top-modes-list">
                        {Object.entries(modeStats)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 3)
                            .map(([mode, count], index) => {
                                const percentage = ((count / total) * 100).toFixed(1);
                                return (
                                    <div key={mode} className="top-mode-item" style={{ color: colorMap[mode] || '#8e2de2' }}>
                                        {index === 0 && '🥇'}{index === 1 && '🥈'}{index === 2 && '🥉'} {mode.charAt(0).toUpperCase() + mode.slice(1)} ({percentage}%)
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </motion.div>

            <div className="stats-buttons">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="home-button"
                    onClick={() => navigate('/')}
                >
                    🏠 Go to Home
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="meme-button"
                    onClick={() => navigate('/meme')}
                >
                    🚀 Try Meme Generator
                </motion.button>
            </div>
        </div>
    );
};

export default Stats;