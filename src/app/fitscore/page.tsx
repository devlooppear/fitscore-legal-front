"use client";

import React, { useState, useEffect } from "react";
import { useFitScoreAnswers } from "@/hooks/useFitScoreAnswers/useFitScoreAnswers";
import { FaRegSmileBeam } from "react-icons/fa";
import { Box, Card, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import StyledButton from "@/components/StyledButton/StyledButton";
import systemColors from "@/common/constants/systemColors";

export default function FitScorePage() {
  const { t } = useTranslation("fitscore");

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

  const { answers, setAnswer } = useFitScoreAnswers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    const firstUnanswered = questions.findIndex(
      (q) => answers[q.key] === undefined
    );
    if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
    else if (Object.keys(answers).length === questions.length)
      setCurrentIndex(questions.length - 1);
  }, [questions, answers]);

  const current = questions[currentIndex];

  const handleAnswer = (value: number) => {
    setAnswer(current.key, value);
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else setFinished(true);
  };


  const allAnswered = Object.keys(answers).length === questions.length && questions.every(q => answers[q.key] !== undefined);

  if (finished || allAnswered)
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
              onClick={() => handleAnswer(opt.value)}
            />
          ))}
        </Box>
      </Card>
    </Box>
  );
}
