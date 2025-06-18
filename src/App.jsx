import React, { useState, useEffect } from 'react';
import { questions } from './questions';
import ResultPopup from './Popup';
import './App.css';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSet, setQuizSet] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!quizStarted || showPopup) return;
    if (timeLeft <= 0) handleAnswer(null);

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentQ, quizStarted, showPopup]);

  const startQuiz = () => {
    setLoading(true);
    setTimeout(() => {
      const randomSet = [...questions].sort(() => 0.5 - Math.random()).slice(0, 10);
      setQuizSet(randomSet);
      setQuizStarted(true);
      setCurrentQ(0);
      setScore(0);
      setTimeLeft(5);
      setShowPopup(false);
      setLoading(false);
    }, 1500);
  };

  const handleAnswer = (option) => {
    if (option === quizSet[currentQ].answer) setScore(score + 1);
    if (currentQ === quizSet.length - 1) {
      setShowPopup(true);
    } else {
      setCurrentQ(currentQ + 1);
      setTimeLeft(5);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
  };

  return (
    <div className="app-container">
      <h1 className="quiz-title">FogoChain Knowledge Trial</h1>
      <p className="subtitle">Let’s test if you’re truly forged in fire 🔥</p>

      {loading ? (
        <div className="start-screen">
          <p className="subtitle">🔥 Warming up your Trial... 🔥</p>
        </div>
      ) : !quizStarted ? (
        <div className="start-screen">
          <p>
            Welcome to the Fogo Trials — 10 high-speed questions from the depths of the chain. 
            Only the brightest flames survive.
          </p>
          <button className="start-btn" onClick={startQuiz}>Ignite Quiz</button>
        </div>
      ) : !showPopup ? (
        <div className="quiz-box fade-in">
          <h2>{quizSet[currentQ].question}</h2>
          <div className="options-grid">
            {quizSet[currentQ].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)}>{opt}</button>
            ))}
          </div>
          <div className="timer">⏱️ {timeLeft}s</div>
        </div>
      ) : (
        <ResultPopup
          score={score}
          total={quizSet.length}
          restart={restartQuiz}
        />
      )}

      <footer className="footer">
        This project is a gift to the community — forged for FogoChain.<br />
        Crafted by <a href="https://x.com/bytrizz404" target="_blank" rel="noopener noreferrer">@bytrizz404</a> (Discord: bytrizz)<br />
        No ads. No gimmicks. Just 🔥 and knowledge.
      </footer>
    </div>
  );
}

export default App;
