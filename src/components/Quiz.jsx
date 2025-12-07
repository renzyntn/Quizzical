import { useState, useEffect } from "react";
import { decode } from "html-entities"; // decode library
import clsx from "clsx";
import mockUpData from "../mockup.json";
import Loading from "./Loading";
import Toast from "./Toast";

function Quiz() {
  // Initialize result state array that will handle API response (question and answer)
  const [result, setResult] = useState([]);
  // Initialize object state that will store all user answer choices
  const [selectedAnswer, setSelectedAnswer] = useState({});
  // Initialize score state to 0
  const [score, setScore] = useState(0);
  // Initialize displayScore to false
  const [displayScore, setDisplayScore] = useState(false);
  // Initialize isLoading to true
  const [isLoading, setIsLoading] = useState(true);
  // Initialize newGame state to 0
  const [newGame, setNewGame] = useState(0);
  // Initialize toast state to false
  const [toast, setToast] = useState(false);

  // Initialize isAllQuestionAnswered to check if user already have answer choices on each question.
  const isAllQuestionAnswered =
    Object.keys(selectedAnswer).length === result.length;

  // Initialize useEffect to fetch reponse from the API
  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_APP_API);
        if (!response.ok) {
          throw new Error("There was a problem with the server.");
        }
        const data = await response.json();

        // map through data.results object and add a new property 'choicesArray' that will store all
        //  incorrect and correct values and shuffle their index positions (sort and random)
        const responseChoiceShuffle = data.results.map((response) => ({
          ...response,
          choicesArray: [
            ...response.incorrect_answers,
            response.correct_answer,
          ].sort(() => Math.random() - 0.5),
        }));

        // then set the response to 'result' state
        setResult(responseChoiceShuffle);
      } catch (error) {
        console.log(error);

        // if fail to fetch then use the mockUpData.json property instead (for fallback purposes)
        const mockupChoiceShuffle = mockUpData.results.map((response) => ({
          ...response,
          choicesArray: [
            ...response.incorrect_answers,
            response.correct_answer,
          ].sort(() => Math.random() - 0.5),
        }));

        // then set it instead
        setResult(mockupChoiceShuffle);
      } finally {
        // set isLoading state to false to remove Loading effect. (whatever the result between try/catch)
        setIsLoading(false);
      }
    };

    // return async function
    getResponse();
  }, [newGame]); // add newGame state as dependency (if user clicked 'Play again' useEffect will run and re-fetch new set of data)

  // Initialize answerChoice function with questionIndex and questionAnswer parameter
  function answerChoice(questionIndex, questionAnswer) {
    // Collect all of the answer choices (index and value) and add it in 'selectedAnswer' state
    setSelectedAnswer((prevAnswer) => ({
      ...prevAnswer,
      [questionIndex]: questionAnswer,
    }));
  }

  // Initialize checkAnswer function
  function checkAnswer() {
    // Check if isAllQuestionAnswered is false
    //  and setToast to true so it notifies user to answer all of the questions
    //  then setToast to false again after 3 seconds.
    if (!isAllQuestionAnswered) {
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      return;
    }
    // Initialize correctCount that will return the total number of each selectedAnswer state that matches each question's correct answer
    let correctCount = result.filter(
      (question, index) => selectedAnswer[index] === question.correct_answer
    ).length; // .length to count total values that matches correct_answer: values

    // then setScore state as its value
    setScore(correctCount);
    // setDisplayScore to true for result of total scores to show in the DOM
    setDisplayScore(true);
  }

  // Initialize playAgain function. This will basically re-render or reset state values
  //  except newGame state will increment for useEffect to run or re-fetch new data
  function playAgain() {
    setSelectedAnswer({});
    setScore(0);
    setDisplayScore(false);
    setIsLoading(true);
    setNewGame((prevGame) => prevGame + 1);
  }

  // Initialize displayResult that maps through 'result' state
  const displayResult = result.map((data, index) => {
    // Initialize displayQuestion with question decoded
    const displayQuestion = decode(data.question);

    // Initialize displayChoice that will map through 'choicesArray' property
    const displayChoice = data.choicesArray.map((choice, choiceIndex) => {
      // The following boolean variables are declared to set the answer choices style base on the game current state (before and after)

      // Initialize isHeld that will check if user select one of the answer choices
      const isHeld = selectedAnswer[index] === choice;
      // Initialize isCorrect that will check if the user selected answer is correct (or matches the correct_answer: value)
      const isCorrect = choice === data.correct_answer;
      // Initialize isWrong that will check if the following values are true
      const isWrong = displayScore && isHeld && !isCorrect;
      // Initialize showCorrectAnswer that will check if the following values are true
      const showCorrectAnswer = displayScore && isCorrect;
      // Initialize fadeChoice to check if the following values are true
      const fadeChoice = displayScore && !isCorrect;

      return (
        <button
          className={clsx(
            `border-1 rounded-lg py-1 px-2 text-xs font-inter font-medium text-lavender-font hover:cursor-pointer ${
              !fadeChoice
                ? "active:scale-90 transform duration-200 ease-in-out"
                : ""
            }`,
            {
              "bg-green-custom border-none": showCorrectAnswer,
              "bg-red-custom border-none": isWrong,
              "bg-lavender-button": isHeld && !displayScore,
              "border-lavender-button-start":
                !isHeld && !displayScore && !showCorrectAnswer,
              "opacity-50": fadeChoice,
            }
          )}
          key={choiceIndex}
          onClick={() => answerChoice(index, choice)}
          disabled={displayScore}
        >
          {decode(choice)}
        </button>
      );
    });

    return (
      <div
        className="min-w-full flex flex-col justify-start items-start space-y-3"
        key={index}
      >
        <h3 className="text-lavender-font text-lg font-karla font-bold break-normal">
          {displayQuestion}
        </h3>
        <div className="max-w-full flex flex-wrap justify-start items-center gap-2">
          {displayChoice}
        </div>
        <hr className="w-full border-b-2 border-lavender-button mt-3.5" />
      </div>
    );
  });

  return (
    <section className="max-w-4xl flex flex-col justify-center items-center p-6 space-y-3">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {toast && <Toast />}
          {displayResult}
          <footer className="w-full flex py-2.5 justify-center items-center gap-6">
            {displayScore && (
              <span className="font-inter font-bold text-sm text-lavender-font">
                {`You scored ${score}/${result.length} correct answers`}
              </span>
            )}
            <button
              className="min-w-30 h-10 flex justify-center items-center rounded-xl bg-lavender p-2.5 active:scale-90 transform duration-250 ease-in-out hover:cursor-pointer"
              onClick={displayScore ? playAgain : checkAnswer}
            >
              <span className="text-white-custom text-xs font-inter font-semibold">
                {displayScore ? "Play again" : "Check answers"}
              </span>
            </button>
          </footer>
        </>
      )}
    </section>
  );
}

export default Quiz;
