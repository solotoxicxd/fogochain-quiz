import React, { useState, useEffect } from "react";
import { questions } from "./questions";
import ResultPopup from "./Popup";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isDisabled, setIsDisabled] = useState(false);

  const quizSet = [...questions].sort(() => 0.5 - Math.random()).slice(0, 10);

  useEffect(() => {
    if (!started || showPopup || isDisabled) return;
    if (timeLeft === 0) {
      setIsDisabled(true);
    } else {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, started, currentQ, showPopup, isDisabled]);

  const handleAnswer = (option) => {
    if (option === quizSet[currentQ].answer) {
      setScore(score + 1);
    }
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQ === quizSet.length - 1) {
      setShowPopup(true);
    } else {
      setCurrentQ(currentQ + 1);
      setTimeLeft(5);
      setIsDisabled(false);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(5);
    setShowPopup(false);
    setIsDisabled(false);
  };

  return (
    <div className="app-container">
      <h1 className="quiz-title">FogoChain Knowledge Trial</h1>
      <p className="subtitle">Let’s see if the fire runs through your soul — answer quick, rise higher.</p>

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
            {quizSet[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                disabled={isDisabled}
                style={{ opacity: isDisabled ? 0.6 : 1 }}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="timer">
            {isDisabled ? "⏱️ Time’s up!" : `⏱️ ${timeLeft}s`}
          </div>
          {isDisabled && (
            <button className="restart-btn" onClick={moveToNextQuestion}>
              Next Question
            </button>
          )}
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
