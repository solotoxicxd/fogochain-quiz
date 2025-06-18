import React from "react";

const getRank = (score) => {
  if (score === 10) return { title: "Inferno Master", msg: "Blazing brilliance. You own the flame." };
  if (score >= 8) return { title: "Flame Guardian", msg: "You walk through fire like a leader." };
  if (score >= 5) return { title: "Ember Seeker", msg: "The fire is in you. Keep igniting." };
  if (score >= 3) return { title: "Smoke Starter", msg: "You’ve sparked it. Fan it further." };
  return { title: "Ice Caster", msg: "The flame eludes you. Study the spark." };
};

function ResultPopup({ score }) {
  const { title, msg } = getRank(score);
  const shareText = encodeURIComponent(
    `I just took the FogoChain Quiz and scored ${score}/10 — earned the rank: ${title}. Are you Fogolised yet? https://fogochain-quiz.vercel.app #FogoChain #Web3Quiz #OnchainKnowledge`
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
        Share your result on X
      </a>
    </div>
  );
}

export default ResultPopup;
