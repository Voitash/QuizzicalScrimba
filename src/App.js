import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [startScreen, setStartScreen] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);

  function startGame() {
    setStartScreen((prev) => !prev);
  }

  React.useEffect(() => {
    const NUMBER_OF_QUESTIONS = 5;
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}&type=multiple&encode=base64`
        );
        const data = await res.json();
        const prepareData = data.results.map((question) => {
          return {
            question: atob(question.question),
            correct_answer: atob(question.correct_answer),
            allAnswers: [
              atob(question.correct_answer),
              ...question.incorrect_answers.map((incorrectAnswer) =>
                atob(incorrectAnswer)
              ),
            ].sort(() => Math.random() - 0.5),
          };
        });
        setQuestions(prepareData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="App">
      {startScreen && <Start handleClick={startGame} />}
      {!startScreen && <Quiz questions={questions} />}
    </div>
  );
}

export default App;
