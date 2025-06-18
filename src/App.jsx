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

  // Timer effect only runs when quiz is active
  useEffect(() => {
    if (!quizStarted || showPopup) return;

    if (timeLeft <= 0) {
      handleAnswer(null); // timeout
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
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
    if (option === quizSet[currentQ].answer) {
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

      {!quizStarted ? (
        <div className="start-screen">
          <p>Are you ready to test your 🔥 FogoChain knowledge?</p>
          <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : !showPopup ? (
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
