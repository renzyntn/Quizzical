import { useState } from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [startGame, setStartGame] = useState(false);

  function startGameButton() {
    setStartGame((prevStart) => !prevStart);
  }

  return (
    <main className="max-w-screen h-screen flex justify-center items-center">
      {startGame ? (
        <Quiz />
      ) : (
        <Start startGameButton={() => startGameButton()} />
      )}
    </main>
  );
}

export default App;
