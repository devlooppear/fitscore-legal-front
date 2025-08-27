export interface FitScoreInput {
  performance: number;
  energy: number;
  culture: number;
}

export interface FitScore {
  id: number;
  userId: number;
  performance: number;
  energy: number;
  culture: number;
  totalScore: number;
  classification: string;
  user?: any;
}
