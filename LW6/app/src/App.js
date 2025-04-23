import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    questionText: 'Яка команда використовується для створення нового проекту React.js?',
    answerOptions: [
      { answerText: 'create-react-app app_quiz_reactjs', isCorrect: false },
      { answerText: 'npx create-react-app app_quiz_reactjs', isCorrect: true },
      { answerText: 'npm create-react-app app_quiz_reactjs', isCorrect: false },
    ],
  },
  {
    questionText: 'Який хук використовується для додавання стану в функціональний компонент?',
    answerOptions: [
      { answerText: 'useEffect', isCorrect: false },
      { answerText: 'useState', isCorrect: true },
      { answerText: 'useContext', isCorrect: false },
    ],
  },
  {
    questionText: 'Що робить метод map() у React?',
    answerOptions: [
      { answerText: 'Змінює оригінальний масив', isCorrect: false },
      { answerText: 'Створює новий масив з результатами виклику функції', isCorrect: true },
      { answerText: 'Фільтрує елементи масиву', isCorrect: false },
    ],
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (isCorrect, index) => {
    setSelectedAnswer(index);
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
      setSelectedAnswer(null);
    }, 800);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="result-screen">
          <h2>Ваш результат</h2>
          <p className="score">{score} з {questions.length}</p>
          <button className="restart-btn" onClick={restartQuiz}>
            Почати знову
          </button>
        </div>
      ) : (
        <div className="quiz-container">
          <header>
            <h1>Тест на React.js</h1>
            <div className="progress">
              Питання {currentQuestion + 1}/{questions.length}
            </div>
          </header>

          <div className="question-card">
            <p className="question-text">{questions[currentQuestion].questionText}</p>
            
            <div className="answers-grid">
              {questions[currentQuestion].answerOptions.map((option, index) => (
                <button
                  key={index}
                  className={`answer-btn ${
                    selectedAnswer !== null
                      ? option.isCorrect
                        ? 'correct'
                        : index === selectedAnswer
                        ? 'incorrect'
                        : 'disabled'
                      : ''
                  }`}
                  onClick={() => handleAnswerClick(option.isCorrect, index)}
                  disabled={selectedAnswer !== null}
                >
                  {option.answerText}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;