// 📁 src/Popup.jsx

import React from "react";

export default function ResultPopup({ score, total, onRestart }) {
  const getRank = (s) =>
    s === total
      ? "🔥 Flame Master"
      : s >= 8
      ? "🔥 Blazing Soul"
      : s >= 6
      ? "🔥 Lit Ember"
      : s >= 3
      ? "🔥 Spark Seeker"
      : "❄️ Cold Ash";

  const rank = getRank(score);
  
  const shareText = encodeURIComponent(
    `Just stepped into the FogoChain quiz and scored ${score}/${total} — earned the “${rank}” title. Think you're forged in fire? Try this trial by flames:`
  );

  const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=https://fogochain.vercel.app&via=bytrizz44`;

  return (
    <div className="result-popup">
      <h2>{rank}</h2>
      <p className="score">
        You scored {score} of {total}
      </p>
      <div>
        <button className="restart-btn" onClick={onRestart}>
          Try Again
        </button>
        <a
          className="share-button"
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Share on X
        </a>
      </div>
    </div>
  );
}
