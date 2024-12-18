import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const DynamicQuiz = () => {
  const [questions, setQuestions] = useState([]); // Holds questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy"); // Difficulty level
  const [loading, setLoading] = useState(true);
  const [quizOver, setQuizOver] = useState(false);

  
  // API URL for fetching questions
  const fetchQuestions = async (difficulty) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}&type=multiple`
      );
      const formattedQuestions = response.data.results.map((q) => ({
        question: q.question,
        correctAnswer: q.correct_answer,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      }));
      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(difficulty); // Fetch questions when the difficulty changes
  }, [difficulty]);

  // Handle answer selection
  const handleAnswerClick = (option) => {
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1); // Increment score
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Next question
    } else {
      setQuizOver(true); // Quiz over
    }
  };

  // Move to next level (increase difficulty)
  const handleNextLevel = () => {
    setDifficulty((prev) => (prev === "easy" ? "medium" : prev === "medium" ? "hard" : "hard"));
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizOver(false);
  };

  return (
    <div className="quiz-container">
      <h2>Technology Quiz - {difficulty.toUpperCase()}</h2>
      {loading ? (
        <p>Loading Questions...</p>
      ) : quizOver ? (
        <div className="quiz-results">
          <h3>Quiz Completed!</h3>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={handleNextLevel}>
            {difficulty === "hard" ? "Retry Hard Level" : "Next Level"}
          </button>
        </div>
      ) : (
        <div>
          <h3 dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className="option-btn"
              >
                {option}
              </button>
            ))}
          </div>
          <p>
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default DynamicQuiz;