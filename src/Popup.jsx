import React from "react";

export default function Popup({ score, total, onRestart }) {
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
    `I just stepped into the flames of the FogoChain quiz and came out with a ${score}/${total} — earning the "${rank}" title.

This isn’t just a quiz. It’s a trial by fire for those who claim to be part of the chain.

If you're truly forged in the Fogo spirit, here's your moment to prove it:  
https://fogochain.vercel.app

Crafted with fire and fun by @bytrizz44 🔥`
  );

  const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;

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
