import { useState, useEffect } from "react";
import { decode } from "html-entities";
import mockUpData from "../mockup.json";
import Loading from "./Loading";

function Quiz() {
  const [result, setResult] = useState(mockUpData.results);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_APP_API);
        if (!response.ok) {
          throw new Error("There was a problem with the server.");
        }
        const data = await response.json();
        setResult(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getResponse();
  }, []);

  const displayResult = result.map((data, index) => {
    const displayQuestion = decode(data.question);
    const answerArray = [...data.incorrect_answers, data.correct_answer].sort(
      () => Math.random() - 0.5
    );

    const displayChoice = answerArray.map((choice, index) => {
      return (
        <button
          className="border-1 border-lavender-button-start rounded-lg py-1 px-2 text-xs font-inter font-medium text-lavender-font hover:cursor-pointer active:scale-90 transform duration-200 ease-in-out"
          key={index}
        >
          {decode(choice)}
        </button>
      );
    });

    return (
      <div
        className="w-full flex flex-col justify-start items-start space-y-3"
        key={index}
      >
        <h3 className="text-lavender-font text-lg font-karla font-bold break-all">
          {displayQuestion}
        </h3>
        <div className="max-w-full flex flex-wrap justify-start items-center gap-3">
          {displayChoice}
        </div>
        <hr className="w-full border-b-2 border-lavender-button mt-3.5" />
      </div>
    );
  });

  return (
    <section className="w-auto h-auto flex flex-col justify-center items-center px-8 space-y-3">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {displayResult}
          <footer className="w-full flex py-2.5 justify-center items-center gap-6">
            {/*<span className="font-inter font-bold text-[14px] text-lavender-font">
                You scored 5/5 correct answers
              </span>*/}
            <button className="min-w-30 h-10 flex justify-center items-center rounded-xl bg-lavender p-2.5 active:scale-90 transform duration-250 ease-in-out hover:cursor-pointer">
              <span className="text-white-custom text-xs font-inter font-semibold">
                Check answers
              </span>
            </button>
          </footer>
        </>
      )}
    </section>
  );
}

export default Quiz;
