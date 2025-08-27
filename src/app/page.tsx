"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { FaClipboardList, FaUserCheck } from "react-icons/fa";
import StyledButton from "@/components/StyledButton/StyledButton";
import { useAuth } from "@/provider/auth/AuthProvider";
import { Routes } from "@/common/constants/routes";
import systemColors from "@/common/constants/systemColors";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { UserType } from "@/enum/userType";

export default function HomePage() {
  const { userType, token } = useAuth();
  const { navTo } = useNavTo();

  if (!token) {
    navTo(Routes.INTRODUCTION);
    return null;
  }

  const isCandidate = userType === UserType.CANDIDATE;
  const isRecruiter = userType === UserType.RECRUITER;

  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 3, sm: 6 },
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: systemColors.indigo[900] }}
      >
        {isCandidate
          ? "Olá, Candidato! 👋"
          : isRecruiter
          ? "Olá, Recrutador! 👋"
          : "Olá!"}
      </Typography>

      <Typography variant="body1" sx={{ color: systemColors.indigo[700] }}>
        {isCandidate
          ? "Seja bem-vindo! Seu teste FitScore está disponível. Responda com atenção e dentro do prazo para que possamos avaliar seu perfil."
          : "Bem-vindo! Aqui você pode acompanhar as avaliações dos candidatos. Fique atento aos prazos e às atualizações do FitScore."}
      </Typography>

      <Divider sx={{ bgcolor: systemColors.indigo[200] }} />

      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={4}>
        {isCandidate && (
          <Box
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              bgcolor: systemColors.blue[50],
              boxShadow: `0 4px 12px ${systemColors.gray[300]}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <FaClipboardList size={48} color={systemColors.blue[600]} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Começar o FitScore
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Complete o formulário e descubra seu FitScore LEGAL.
            </Typography>
            <StyledButton
              label="Ir para o teste"
              onClick={() => navTo(Routes.FORM_FITSCORE)}
            />
          </Box>
        )}

        {isRecruiter && (
          <Box
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              bgcolor: systemColors.indigo[50],
              boxShadow: `0 4px 12px ${systemColors.gray[300]}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <FaUserCheck size={48} color={systemColors.indigo[600]} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Dashboard de Candidatos
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Acompanhe os resultados dos candidatos. Lembre-se que só será
              possível ver o FitScore após o candidato finalizar o teste.
            </Typography>
            <StyledButton
              label="Ir para Dashboard"
              onClick={() => navTo(Routes.DASHBOARD)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
