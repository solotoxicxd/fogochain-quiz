import React, { useEffect, useState } from 'react';

const getRank = (score) => {
  if (score === 10) return '🔥 Inferno Master';
  if (score >= 8) return 'Flame Guardian';
  if (score >= 6) return 'Blazing Seeker';
  if (score >= 4) return 'Kindled Soul';
  return 'Ash Whisperer';
};

function ResultPopup({ score, total, restart }) {
  const [leaderboard, setLeaderboard] = useState([]);

  const rank = getRank(score);
  const timestamp = new Date().toLocaleString();

  const shareText = encodeURIComponent(
    `I took the FogoChain Quiz and scored ${score}/${total}! Earned the rank of "${rank}". 🔥 Try yours:`
  );
  const shareURL = `https://x.com/intent/tweet?text=${shareText}&url=https://fogochain-quiz.vercel.app&hashtags=FogoChain,Web3Quiz`;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('fogo-leaderboard')) || [];
    const updated = [...stored, { score, rank, time: timestamp }];
    localStorage.setItem('fogo-leaderboard', JSON.stringify(updated));
    setLeaderboard(updated.slice(-5).reverse()); // Show last 5 scores
  }, []);

  return (
    <div className="result-popup fade-in">
      <h2>Quiz Completed</h2>
      <p className="score">You scored {score} out of {total}</p>
      <p className="score">Rank: <strong>{rank}</strong></p>

      <a href={shareURL} className="share-button" target="_blank" rel="noopener noreferrer">
        Share Your Results on X
      </a>

      <button className="restart-btn" onClick={restart}>🔥 Retake the Quiz</button>

      <div className="leaderboard">
        <h3>🔥 Recent Scores</h3>
        <ul>
          {leaderboard.map((entry, i) => (
            <li key={i}>
              <strong>{entry.rank}</strong> - {entry.score}/10 <span>({entry.time})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResultPopup;
