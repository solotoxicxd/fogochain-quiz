import React from 'react';

const getRank = (score) => {
  if (score === 10) return 'Inferno Master';
  if (score >= 8) return 'Flame Guardian';
  if (score >= 6) return 'Blazing Seeker';
  if (score >= 4) return 'Kindled Soul';
  return 'Ash Whisperer';
};

function ResultPopup({ score, total, restart }) {
  const rank = getRank(score);
  const shareText = encodeURIComponent(
    `I just took the FogoChain Quiz and scored ${score}/${total} — earned the rank: ${rank}. Are you Fogolised yet?`
  );
  const shareURL = `https://x.com/intent/tweet?text=${shareText}&url=https://fogochain-quiz.vercel.app&hashtags=FogoChain,Web3Quiz`;

  return (
    <div className="result-popup">
      <h2>Quiz Completed</h2>
      <p className="score">Score: {score}/{total}</p>
      <p className="score">Rank: <strong>{rank}</strong></p>

      <div>
        <a href={shareURL} target="_blank" rel="noopener noreferrer" className="share-button">
          Share Your Results on X
        </a>
      </div>

      <button className="restart-btn" onClick={restart}>Retake Quiz</button>
    </div>
  );
}

export default ResultPopup;
