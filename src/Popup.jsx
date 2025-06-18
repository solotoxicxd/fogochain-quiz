import React from "react";

const getRank = (score) => {
  if (score === 10) return "🔥 Flame Master";
  if (score >= 8) return "🔥 Blazing Soul";
  if (score >= 6) return "🔥 Lit Ember";
  if (score >= 3) return "🔥 Spark Seeker";
  return "❄️ Cold Ash";
};

const getMessage = (score) => {
  if (score === 10) return "You're forged by fire.";
  if (score >= 8) return "You carry the heat proudly.";
  if (score >= 6) return "You're warming up nicely.";
  if (score >= 3) return "You're catching the flame.";
  return "Time to relight your spark.";
};

const ResultPopup = ({ score, total, onRestart }) => {
  const rank = getRank(score);
  const message = getMessage(score);
  const shareText = encodeURIComponent(
    `Scored ${score}/${total} on the FogoChain Quiz — Rank: ${rank.replace("🔥", "").trim()}! 🔥 Try it yourself!`
  );
  const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=https://fogochain.vercel.app`;

  return (
    <div className="result-popup">
      <h2>{rank}</h2>
      <p className="score">You scored {score} out of {total}</p>
      <p className="subtitle">{message}</p>
      <div>
        <button className="restart-btn" onClick={onRestart}>Try Again</button>
        <a className="share-button" href={shareUrl} target="_blank" rel="noopener noreferrer">
          Share on X
        </a>
      </div>
    </div>
  );
};

export default ResultPopup;
