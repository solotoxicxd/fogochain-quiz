import React, { useState, useEffect } from "react";
import { questions } from "./questions";
import ResultPopup from "./Popup";
import "./App.css";

function App() {
  const quizSet = [...questions].sort(() => 0.5 - Math.random()).slice(0, 10);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft <= 0) handleAnswer(null);
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentQ]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizSet[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ === quizSet.length - 1) {
      setShowPopup(true);
    } else {
      setCurrentQ(currentQ + 1);
      setTimeLeft(5);
    }
  };

  return (
    <div className="app-container">
      <h1 className="quiz-title">🔥 FogoChain Knowledge Trial 🔥</h1>

      {!showPopup ? (
        <div className="quiz-box">
          <h2>{quizSet[currentQ].question}</h2>
          <div className="options">
            {quizSet[currentQ].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
          <div className="timer">⏱️ {timeLeft}s</div>
        </div>
      ) : (
        <ResultPopup score={score} />
      )}
    </div>
  );
}

export default App;

