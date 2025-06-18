import React from "react";

const getRank = (score) => {
  if (score === 10) return { title: "🔥🔥🔥 Inferno Master", msg: "Legend! You're fully Fogolised." };
  if (score >= 8) return { title: "🔥🔥 Flame Guardian", msg: "Your knowledge burns bright." };
  if (score >= 5) return { title: "🔥 Ember Seeker", msg: "You're catching fire!" };
  if (score >= 3) return { title: "🔸 Smoke Starter", msg: "Not bad, but more heat needed." };
  return { title: "❄️ Ice Caster", msg: "Your fire is yet to be lit." };
};

function ResultPopup({ score }) {
  const { title, msg } = getRank(score);
  const shareText = encodeURIComponent(
    `🔥 I scored ${score}/10 — ${title} in the FogoChain Quiz! Try it: https://your-vercel-link.vercel.app/ #Fogolised #FogoChain`
  );

  return (
    <div className="result-popup">
      <h2>{title}</h2>
      <p>{msg}</p>
      <p className="score">Score: {score} / 10</p>
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-button"
      >
        Share on X
      </a>
    </div>
  );
}

export default ResultPopup;
