"use client";

import React, { createContext, useEffect, useState } from "react";
import { FitScoreAnswers, FitScoreContextType } from "./interface";
import {
  FitScoreCalcResult,
  FitScoreClassification,
} from "@/enum/FitScoreClassification";

export const FitScoreContext = createContext<FitScoreContextType | undefined>(
  undefined
);

export const FitScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [answers, setAnswers] = useState<FitScoreAnswers>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fitscore_answers");
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  });

  function calculateFitScore(
    answers: Record<string, number>
  ): FitScoreCalcResult {
    const perf = [1, 2, 3].map((i) => answers[`p${i}`] ?? 0);
    const energy = [4, 5, 6].map((i) => answers[`p${i}`] ?? 0);
    const culture = [7, 8, 9, 10].map((i) => answers[`p${i}`] ?? 0);

    const performance = Math.round(
      ((perf.reduce((a, b) => a + b, 0) / 3) * 100) / 3
    );
    const energyScore = Math.round(
      ((energy.reduce((a, b) => a + b, 0) / 3) * 100) / 3
    );
    const cultureScore = Math.round(
      ((culture.reduce((a, b) => a + b, 0) / 4) * 100) / 3
    );

    const totalScore = Math.round(
      (performance + energyScore + cultureScore) / 3
    );

    let classification: FitScoreClassification;
    if (totalScore >= 80) classification = FitScoreClassification.FIT_ALTISSIMO;
    else if (totalScore >= 60)
      classification = FitScoreClassification.FIT_APROVADO;
    else if (totalScore >= 40)
      classification = FitScoreClassification.FIT_QUESTIONAVEL;
    else classification = FitScoreClassification.FORA_DO_PERFIL;

    return {
      performance,
      energy: energyScore,
      culture: cultureScore,
      totalScore,
      classification,
    };
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fitscore_answers", JSON.stringify(answers));
    }
  }, [answers]);

  const setAnswer = (key: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const clearAnswers = () => {
    setAnswers({});
    if (typeof window !== "undefined") {
      localStorage.removeItem("fitscore_answers");
    }
  };

  const fitScoreResult: FitScoreCalcResult | null =
    Object.keys(answers).length >= 10 &&
    Object.values(answers).every((v) => typeof v === "number")
      ? calculateFitScore(answers)
      : null;

  return (
    <FitScoreContext.Provider
      value={{
        answers,
        setAnswer,
        clearAnswers,
        fitScoreResult,
      }}
    >
      {children}
    </FitScoreContext.Provider>
  );
};
