import { FitScoreContext } from "@/provider/fitscore/FitScoreProvider";
import { useContext } from "react";

export function useFitScoreAnswers() {
  const context = useContext(FitScoreContext);
  if (!context)
    throw new Error("useFitScoreAnswers must be used within FitScoreProvider");
  return context;
}
