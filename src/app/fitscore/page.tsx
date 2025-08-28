"use client";

import React, { useState, useEffect } from "react";
import { useFitScoreAnswers } from "@/hooks/useFitScoreAnswers/useFitScoreAnswers";
import { useCreateFitScore } from "@/hooks/useCreateFitScore/useCreateFitScore";
import { useMyFitScore } from "@/hooks/useMyFitScore/useMyFitScore";
import { FaRegSmileBeam, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Box, Card, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import StyledButton from "@/components/StyledButton/StyledButton";
import Loader from "@/components/Loader/Loader";
import systemColors from "@/common/constants/systemColors";
import { calculateFitScore } from "@/common/utils/calculateFitScore";

export default function FitScorePage() {
  const { t } = useTranslation("fitscore");
  const { answers, setAnswer } = useFitScoreAnswers();
  const createFitScoreMutation = useCreateFitScore();
  const { myFitScore, refetch, isLoading, isError, error } = useMyFitScore();

  const questions = Array.from({ length: 10 }, (_, i) => {
    const key = `p${i + 1}`;
    return {
      key,
      index: i + 1,
      category: t(`questions.${key}.category`),
      question: t(`questions.${key}.question`),
      options: [0, 1, 2, 3].map((v) => ({
        value: v,
        label: t(`questions.${key}.options.${v}`),
      })),
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<number | undefined>(
    undefined
  );
  const [answersTemp, setAnswersTemp] = useState<Record<string, number>>({});

  const current = questions[currentIndex];

  useEffect(() => {
    setCurrentAnswer(answersTemp[current.key]);
  }, [currentIndex]);

  const allAnswered = questions.every((q) => answersTemp[q.key] !== undefined);

  const handleSelectOption = (value: number) => {
    setCurrentAnswer(value);
    setAnswersTemp((prev) => ({ ...prev, [current.key]: value }));
  };

  const handleNext = () => {
    if (currentAnswer === undefined) return;
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleBack = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
  };

  const handleSendFitScore = async () => {
    Object.entries(answersTemp).forEach(([key, value]) =>
      setAnswer(key, value)
    );

    const fitScoreResult = calculateFitScore(answersTemp);
    await createFitScoreMutation.mutateAsync({
      performance: fitScoreResult.performance,
      energy: fitScoreResult.energy,
      culture: fitScoreResult.culture,
    });
    await refetch();
  };

  if (isLoading || createFitScoreMutation.isPending) return <Loader inAll />;
  if (isError) return <div>{String(error)}</div>;

  if (myFitScore.hasFitScore) {
    return (
      <Box
        sx={{
          py: 8,
          px: 3,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: systemColors.indigo[50],
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: systemColors.indigo[100],
            borderRadius: 4,
            boxShadow: `0px 4px 16px ${systemColors.indigo[200]}`,
            p: { xs: 3, sm: 5 },
            maxWidth: 480,
            mb: 4,
          }}
        >
          <FaRegSmileBeam
            size={72}
            color={systemColors.indigo[600]}
            style={{ marginBottom: 20 }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: systemColors.indigo[800],
              textAlign: "center",
            }}
          >
            {t("congratsTitle")}
          </Typography>
          <Divider
            sx={{ width: "100%", my: 2, bgcolor: systemColors.indigo[300] }}
          />
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: systemColors.indigo[700], mb: 2 }}
          >
            {t("congratsDescription")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: systemColors.indigo[600], mb: 1 }}
          >
            {t("congratsMotivation")}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: systemColors.indigo[50],
      }}
    >
      <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
        {t("questionLabel", { index: current.index, total: questions.length })}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ mb: 3, color: systemColors.indigo[700] }}
      >
        {t("categoryLabel", { category: current.category })}
      </Typography>

      <Card
        sx={{
          width: { xs: "100%", sm: 500 },
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          boxShadow: `0px 4px 10px ${systemColors.indigo[300]}`,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {current.question}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {current.options.map((opt) => (
            <StyledButton
              key={opt.value}
              label={opt.label}
              onClick={() => handleSelectOption(opt.value)}
              sx={{
                background:
                  currentAnswer === opt.value
                    ? `linear-gradient(135deg, ${systemColors.indigo[700]} 20%, ${systemColors.indigo[900]} 90%)`
                    : undefined,
                color:
                  currentAnswer === opt.value
                    ? systemColors.gray[50]
                    : undefined,
                boxShadow:
                  currentAnswer === opt.value
                    ? `0px 4px 12px ${systemColors.indigo[400]}`
                    : undefined,
                "&:hover": {
                  background:
                    currentAnswer === opt.value
                      ? `linear-gradient(135deg, ${systemColors.indigo[800]} 20%, ${systemColors.indigo[900]} 90%)`
                      : undefined,
                },
                transition: "all 0.2s",
              }}
            />
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <StyledButton
              label={<FaArrowLeft size={28} />}
              onClick={handleBack}
              disabled={currentIndex === 0}
              sx={{ minWidth: 60, minHeight: 50, padding: 1.5 }}
            />
            {currentIndex < questions.length - 1 &&
              currentAnswer !== undefined && (
                <StyledButton
                  label={<FaArrowRight size={28} />}
                  onClick={handleNext}
                  sx={{ minWidth: 60, minHeight: 50, padding: 1.5 }}
                />
              )}
          </Box>
        </Box>
      </Card>

      {allAnswered &&
        !myFitScore.hasFitScore &&
        currentIndex === questions.length - 1 &&
        currentAnswer !== undefined && (
          <Box sx={{ mt: 4 }}>
            <StyledButton
              label={
                createFitScoreMutation.isPending
                  ? "Enviando..."
                  : "Enviar FitScore"
              }
              onClick={handleSendFitScore}
              disabled={createFitScoreMutation.isPending}
              sx={{ minWidth: 200, padding: "12px 16px" }}
            />
          </Box>
        )}
    </Box>
  );
}
