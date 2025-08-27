"use client";

import React, { createContext, useEffect, useState } from "react";
import { FitScoreAnswers, FitScoreContextType } from "./interface";

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

  return (
    <FitScoreContext.Provider value={{ answers, setAnswer, clearAnswers }}>
      {children}
    </FitScoreContext.Provider>
  );
};
