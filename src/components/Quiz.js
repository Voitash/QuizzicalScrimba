import React from "react";
import { nanoid } from "nanoid";

export default function Quiz({ questions }) {
  const [questionsData, setQuestionsData] = React.useState([]);
  const [showSummary, setShowSummary] = React.useState(false);

  React.useEffect(() => {
    const prepareQuestionsData = () => {
      const preparedQuestionsData = questions.map((question) => {
        return {
          question: question.question,
          allAnswers: question.allAnswers,
          correctAnswer: question.correct_answer,
          isSelected: false,
          selectedAnswer: "",
        };
      });
      setQuestionsData(preparedQuestionsData);
    };
    prepareQuestionsData();
  }, []);

  function handleChange(event, answersIndex) {
    const { value } = event.target;
    const updatedQuestionsData = [...questionsData];
    updatedQuestionsData[answersIndex] = {
      ...updatedQuestionsData[answersIndex],
      isSelected: true,
      selectedAnswer: value,
    };
    setQuestionsData(updatedQuestionsData);
  }

  function countCorrectAnswers() {
    let correctAnswers = 0;
    questionsData.forEach((item) => {
      if (item.selectedAnswer === item.correctAnswer) {
        correctAnswers += 1;
      }
    });
    return correctAnswers;
  }

  function handleCheckAnswersClick() {
    countCorrectAnswers();
    setShowSummary(true);
  }

  function renderSummary() {
    return (
      <div className="bold">
        Correct answers: {countCorrectAnswers()}/{questionsData.length}
      </div>
    );
  }

  function summaryVersion(answersIndex, answer) {
    if (
      isChecked(answersIndex, answer) &&
      answer !== questionsData[answersIndex].correctAnswer
    ) {
      return "red";
    }
    if (answer === questionsData[answersIndex].correctAnswer) {
      return "green";
    }
  }

  function noSummaryVersion(answersIndex, answer) {
    if (isChecked(answersIndex, answer)) {
      return "blue";
    }
  }

  function isChecked(answersIndex, answer) {
    return questionsData[answersIndex].selectedAnswer === answer;
  }

  function renderQuestions() {
    return (
      <div>
        {questionsData.map((item, answersIndex) => (
          <div key={nanoid()}>
            <p className="quiz-question bold">{item.question}</p>
            {item.allAnswers.map((answer) => (
              <div className="quiz-answers" key={nanoid()}>
                <input
                  type="radio"
                  name={`question-${answersIndex}`}
                  value={answer}
                  checked={isChecked(answersIndex, answer)}
                  onChange={(event) => handleChange(event, answersIndex)}
                  label={answer}
                  className={
                    showSummary
                      ? summaryVersion(answersIndex, answer)
                      : noSummaryVersion(answersIndex, answer)
                  }
                  disabled={showSummary}
                ></input>
              </div>
            ))}
            <hr></hr>
          </div>
        ))}
      </div>
    );
  }

  function handleReset() {
    window.location.reload();
  }

  return (
    <div className="quiz-container">
      {renderQuestions()}
      {!showSummary && (
        <button
          onClick={handleCheckAnswersClick}
          disabled={questionsData.some((item) => !item.isSelected)}
        >
          Check Answers
        </button>
      )}
      {showSummary && (
        <div className="summary">
          {renderSummary()}
          <button onClick={handleReset}>Play again</button>
        </div>
      )}
    </div>
  );
}
