import React, { useState, useEffect, useRef } from "react";
import { questions } from "./questions";
import ResultPopup from "./Popup";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selected, setSelected] = useState(null);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const tickRef = useRef(null);
  const quizSet = useRef([...questions].sort(() => 0.5 - Math.random()).slice(0, 10)).current;

  useEffect(() => {
    if (!started || showPopup) return;

    if (timeLeft > 0 && !revealAnswer) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      tickRef.current?.play();
      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && !revealAnswer) {
      setRevealAnswer(true);
      setTimeout(() => moveToNext(), 1000);
    }
  }, [timeLeft, started, showPopup, revealAnswer]);

  const handleAnswer = (option) => {
    if (revealAnswer) return;
    setSelected(option);
    setRevealAnswer(true);
    if (option === quizSet[currentQ].answer) {
      setScore(prev => prev + 1);
    }
    setTimeout(() => moveToNext(), 1000);
  };

  const moveToNext = () => {
    if (currentQ === quizSet.length - 1) {
      setShowPopup(true);
    } else {
      setCurrentQ(prev => prev + 1);
      setTimeLeft(5);
      setSelected(null);
      setRevealAnswer(false);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(5);
    setShowPopup(false);
    setSelected(null);
    setRevealAnswer(false);
  };

  return (
    <div className="app-container">
      <h1 className="quiz-title">FogoChain Knowledge Trial</h1>
      <p className="subtitle">Let’s see if the fire runs through your soul — answer quick, rise higher.</p>

      <audio ref={tickRef} src="/tick.mp3" preload="auto" />

      {!started ? (
        <div className="start-screen">
          <button className="start-btn" onClick={() => setStarted(true)}>
            Start Quiz
          </button>
        </div>
      ) : !showPopup ? (
        <div className="quiz-box">
          <h2>{quizSet[currentQ].question}</h2>
          <div className="options-grid">
            {quizSet[currentQ].options.map((opt, idx) => {
              let className = "";
              if (revealAnswer) {
                if (opt === quizSet[currentQ].answer) className = "correct";
                else if (opt === selected) className = "wrong";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  className={className}
                  disabled={revealAnswer}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="timer">⏱️ {timeLeft}s</div>
        </div>
      ) : (
        <ResultPopup score={score} total={quizSet.length} onRestart={handleRestart} />
      )}

      <footer className="footer">
        Built with 🔥 by <a href="https://x.com/bytrizz404" target="_blank" rel="noreferrer">@bytrizz404</a> (Discord: bytrizz)
      </footer>
    </div>
  );
}

export default App;
