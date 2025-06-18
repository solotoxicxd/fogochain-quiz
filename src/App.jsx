import React, { useState, useEffect } from "react";
import { questions } from "./questions";
import ResultPopup from "./Popup";
import "./App.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSet, setQuizSet] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (!quizStarted || showPopup) return;
    if (timeLeft <= 0) handleAnswer(null);
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentQ, quizStarted, showPopup]);

  const startQuiz = () => {
    setQuizSet([...questions].sort(() => 0.5 - Math.random()).slice(0, 10));
    setQuizStarted(true);
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(5);
    setShowPopup(false);
  };

  const handleAnswer = (option) => {
    if (option === quizSet[currentQ].answer) setScore(score + 1);
    if (currentQ === quizSet.length - 1) setShowPopup(true);
    else {
      setCurrentQ(currentQ + 1);
      setTimeLeft(5);
    }
  };

  return (
    <div className="app-container">
      <h1 className="quiz-title">FogoChain Knowledge Trial</h1>

      {!quizStarted ? (
        <div className="start-screen">
          <p className="subtitle">Let's test if you're truly forged in fire. Welcome to the flames of Fogo.</p>
          <button className="start-btn" onClick={startQuiz}>🔥 Begin Your Trial</button>
          <footer className="footer">
            Crafted with 🔥 by <strong>bytrizz</strong><br />
            <a href="https://x.com/bytrizz404" target="_blank" rel="noopener noreferrer">@bytrizz404</a> on X · <span>bytrizz</span> on Discord
          </footer>
        </div>
      ) : !showPopup ? (
        <div className="quiz-box">
          <h2>{quizSet[currentQ].question}</h2>
          <div className="options-grid">
            {quizSet[currentQ].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
          <div className="timer">Time left: {timeLeft}s</div>
        </div>
      ) : (
        <ResultPopup score={score} onRestart={startQuiz} />
      )}
    </div>
  );
}

export default App;
