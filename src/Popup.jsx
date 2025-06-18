import React from "react";

const getRank = (score) => {
  if (score === 10) return { title: "Inferno Master", msg: "You didn't just pass — you incinerated the challenge." };
  if (score >= 8) return { title: "Flame Guardian", msg: "Sharp. Bold. You protect the fire with wit." };
  if (score >= 5) return { title: "Ember Seeker", msg: "The embers burn in you. Keep going, firestarter." };
  if (score >= 3) return { title: "Smoke Starter", msg: "You made a spark — next time, blaze it." };
  return { title: "Ice Caster", msg: "Cold feet in the flame realm. Study harder, ignite better." };
};

function ResultPopup({ score, onRestart }) {
  const { title, msg } = getRank(score);
  const shareText = encodeURIComponent(
    `Scored ${score}/10 in the FogoChain Knowledge Trial — earned the rank: ${title}. Are you forged or frozen? https://fogochain-quiz.vercel.app #FogoChain #Web3Quiz #bytrizz`
  );

  return (
    <div className="result-popup">
      <h2>{title}</h2>
      <p>{msg}</p>
      <p className="score">🔥 Score: {score} / 10</p>
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-button"
      >
        Share your result on X
      </a>
      <button className="restart-btn" onClick={onRestart}>Take the Trial Again</button>
    </div>
  );
}

export default ResultPopup;
