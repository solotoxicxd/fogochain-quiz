import React from "react";

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
        return `Forged in pure fire — I aced the FogoChain quiz ${score}/${total} and earned the title “${rank}”! Dare to beat that?`;
      case "🔥 Blazing Soul":
        return `Scored ${score}/${total} in the FogoChain quiz — I’m officially a “${rank}”. Fire runs through my onchain veins! 🔥`;
      case "🔥 Lit Ember":
        return `I scored ${score}/${total} and earned the “${rank}” badge. Still glowing, still learning. Are you Fogo enough?`;
      case "🔥 Spark Seeker":
        return `Barely lit but not out — I scored ${score}/${total} on the FogoChain quiz and became a “${rank}”. Can you do better?`;
      case "❄️ Cold Ash":
        return `Oof. Scored ${score}/${total} and became a “${rank}” in the FogoChain quiz. Time to reignite my flame. You try it!`;
      default:
        return `I scored ${score}/${total} in the FogoChain quiz. Can you beat me?`;
    }
  };

  const rank = getRank(score);
  const shareText = encodeURIComponent(
    `${getShareMessage(rank)}\nMade with 🔥+❤️ by @bytrizz404`
  );

  const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=https://fogochain.vercel.app`;

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
