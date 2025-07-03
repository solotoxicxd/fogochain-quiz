import React, { useState, useEffect, useRef } from "react";
import { questions } from "./questions";
import ResultPopup from "./Popup";
import "./App.css";

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState(null);
  const [reveal, setReveal] = useState(false);
  const tickRef = useRef();

  const quizSet = useRef(
    [...questions].sort(() => 0.5 - Math.random()).slice(0, 10)
  ).current;

  useEffect(() => {
    if (!started || showPopup || reveal) return;

    tickRef.current.currentTime = 0;
    tickRef.current.play();

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          clearInterval(timer);
          tickRef.current.pause();
          setReveal(true);
          setTimeout(nextQuestion, 1000);
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQ, started, showPopup, reveal]);

  function handleAnswer(opt) {
    if (reveal) return;
    if (opt === quizSet[currentQ].answer) setScore(s => s + 1);
    clearInterval();
    tickRef.current.pause();
    setSelected(opt);
    setReveal(true);
    setTimeout(nextQuestion, 1000);
  }

  function nextQuestion() {
    if (currentQ === quizSet.length - 1) setShowPopup(true);
    else {
      setCurrentQ(i => i + 1);
      setTimeLeft(10);
      setSelected(null);
      setReveal(false);
    }
  }

  function restart() {
    setStarted(false);
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(10);
    setShowPopup(false);
    setSelected(null);
    setReveal(false);
  }

  return (
    <div className="app-container">
      <h1 className="quiz-title">Are You Fogo Enough?</h1>
      <p className="subtitle">
        A quick-fire challenge to test your flame—10 questions, 10 seconds each. Let’s find out if you’re truly forged in fire.
      </p>


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
            {quizSet[currentQ].options.map((opt, i) => {
              let cls = "";
              if (reveal) {
                if (opt === quizSet[currentQ].answer) cls = "correct";
                else if (opt === selected) cls = "wrong";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className={cls}
                  disabled={reveal}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="timer">⏱️ {timeLeft}s</div>
        </div>
      ) : (
        <ResultPopup score={score} total={quizSet.length} onRestart={restart} />
      )}

      <footer className="footer">
        Crafted with care for the FogoChain fam by <strong>Bytrizz</strong> 💛<br />
        Connect with me:<br />
        <a href="https://x.com/bytrizz404" target="_blank" rel="noreferrer">@bytrizz404 on X</a> &nbsp;|&nbsp;
        <span>bytrizz on Discord</span><br />
        Made for fun, for fire, and for all who feel the flame. 🔥
      </footer>

    </div>
  );
}
