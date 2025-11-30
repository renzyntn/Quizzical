import { useState } from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  return (
    <main className="max-w-xs h-screen mx-auto flex justify-center items-center">
      <Quiz />
    </main>
  );
}

export default App;
