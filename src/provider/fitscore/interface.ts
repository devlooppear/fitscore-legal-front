export interface FitScoreAnswers {
  [key: string]: number;
}

export interface FitScoreContextType {
  answers: FitScoreAnswers;
  setAnswer: (key: string, value: number) => void;
  clearAnswers: () => void;
}