import { FitScoreCalcResult } from "@/enum/FitScoreClassification";

export interface FitScoreAnswers {
  [key: string]: number;
}

export interface FitScoreContextType {
  answers: FitScoreAnswers;
  setAnswer: (key: string, value: number) => void;
  clearAnswers: () => void;
  fitScoreResult?: FitScoreCalcResult | null | undefined;
  createFitScore?: () => void;
  createFitScoreMutation?: any;
  hasSentFitScore?: boolean;
}
