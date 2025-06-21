import React from "react";
import "./App.css"; // Ensure styles for .share-button are here

export default function ResultPopup({ score, total, onRestart }) {
  const getRank = (s) => {
    if (s === total) return "🔥 Flame Master";
    if (s >= 8) return "🔥 Blazing Soul";
    if (s >= 6) return "🔥 Lit Ember";
    if (s >= 3) return "🔥 Spark Seeker";
    return "❄️ Cold Ash";
  };

  const getShareMessage = (rank) => {
    switch (rank) {
      case "🔥 Flame Master":
        return `Perfect score! I blazed through the FogoChain quiz ${score}/${total} and earned the “${rank}” title.🔥 Think you can handle the heat?`;
      case "🔥 Blazing Soul":
        return `On fire! Scored ${score}/${total} in the FogoChain quiz — crowned as a “${rank}”. The flames are alive. 🔥🔥`;
      case "🔥 Lit Ember":
        return `Still burning! Got ${score}/${total} and became a “${rank}”. The fire’s in me — but there’s room to glow brighter. ✨`;
      case "🔥 Spark Seeker":
        return `Not out yet! Scored ${score}/${total} and earned the “${rank}” rank. Still chasing that blaze. 🧡 Ready to ignite?`;
      case "❄️ Cold Ash":
        return `Yikes. Scored ${score}/${total} — officially a “${rank}” 🥶. I need to relight my flame. Think you can do better?`;
      default:
        return `I scored ${score}/${total} in the FogoChain quiz. Come test your flame.`;
    }
  };

  const rank = getRank(score);
  const shareText = encodeURIComponent(
    `${getShareMessage(rank)}\n🔥 Take the FogoChain Trial → https://fogochain.vercel.app\nMade with 🔥+❤️ by @bytrizz404`
  );

  const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;

  return (
    <div className="result-popup">
      <h2 className="rank-title">{rank}</h2>

      <p className="score">
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>

      <div className="button-group">
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
