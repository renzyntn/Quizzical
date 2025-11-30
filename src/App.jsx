import { useState } from "react";
import getOpenTrivia from "./opentrivia.js"
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {

  const [quizStart, setQuizStart] = useState(false);
  const [submitButton, setsubmitButton] = useState(true);
  const [getData, setGetData] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [displayScore, setDisplayScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answerButton, setAnswerButton] = useState(false);

  async function startQuiz() {
    setQuizStart((prevStart) => !prevStart);

    function decodeHtml(html) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    }
    
    const openTriviaAPI = await getOpenTrivia();

    const decodedResults = openTriviaAPI.results.map(data => {

      const decodedIncorrectAnswers = data.incorrect_answers.map(answer => decodeHtml(answer));
      const decodedCorrectAnswer = decodeHtml(data.correct_answer);

      const allAnswers = [...decodedIncorrectAnswers, decodedCorrectAnswer];
      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

      return {
        ...data,
        question: decodeHtml(data.question),
        correct_answer: decodedCorrectAnswer,
        incorrect_answers: decodedIncorrectAnswers,
        shuffledAnswers: shuffledAnswers
      }
    });

    setGetData(decodedResults);
  }

  function getSelectedAnswers(questionIndex, choice) {
    setSelectedAnswers(prevSelectedAnswer => {
      const updatedAnswers = {...prevSelectedAnswer, [questionIndex]: choice}
      
      const allAnswered = getData.every((_, index ) => updatedAnswers.hasOwnProperty(index));
      setsubmitButton(!allAnswered);

      return updatedAnswers;
    });
  }

  function checkAnswers() {
    let correctCount = 0;

    getData.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      const correctAnswer = question.correct_answer;

      if (userAnswer === correctAnswer) {
        correctCount++
      }
    });
    setScore(correctCount)
    setDisplayScore(prevDisplay => !prevDisplay)
    setAnswerButton(prevButton => !prevButton)
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-white-custom">
        {quizStart && getData ? 
          <Quiz 
            apiData={getData}
            selectedAnswers={selectedAnswers}
            getSelectedAnswers={getSelectedAnswers}
            checkAnswers={checkAnswers}
            displayScore={displayScore}
            score={score}
            submitButton={submitButton}
            answerButton={answerButton}
            /> 
          : <Start 
              startQuiz={startQuiz}
            />}
      </div>
    </>
  );
}

export default App;