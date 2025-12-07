import { useState } from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [startGame, setStartGame] = useState(false);

  function startGameButton() {
    setStartGame((prevStart) => !prevStart);
  }

  return (
    <main className="max-w-screen min-h-screen flex justify-center items-center overflow-auto">
      {startGame ? (
        <Quiz />
      ) : (
        <Start startGameButton={() => startGameButton()} />
      )}
    </main>
  );
}

export default App;
