export interface ResultState {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  choicesArray: string[];
}

export interface APIData {
  results: ResultState[];
}

export interface Answer {
  [questionIndex: number]: string;
}

export type StartGame = {
  startGameButton: () => void;
};
