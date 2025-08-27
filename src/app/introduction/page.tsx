"use client";

import React from "react";
import { Box, Typography, Card, Divider } from "@mui/material";
import { FaUserPlus, FaSignInAlt, FaBell, FaChartLine } from "react-icons/fa";
import { Routes } from "@/common/constants/routes";
import systemColors from "@/common/constants/systemColors";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import StyledButton from "@/components/StyledButton/StyledButton";

export default function IntroductionPage() {
  const { navTo } = useNavTo();

  const features = [
    {
      icon: <FaChartLine size={40} color={systemColors.indigo[800]} />,
      title: "Avaliação Dinâmica",
      description:
        "Receba um FitScore completo baseado em Performance, Energia e Cultura para cada candidato.",
    },
    {
      icon: <FaBell size={40} color={systemColors.indigo[800]} />,
      title: "Notificações Automáticas",
      description:
        "Alertas imediatos sobre resultados dos candidatos para manter o processo atualizado.",
    },
    {
      icon: <FaUserPlus size={40} color={systemColors.indigo[800]} />,
      title: "Comece Agora",
      description:
        "Crie sua conta ou faça login se já possui cadastro e comece a avaliar candidatos.",
      isAction: true,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8 },
        px: { xs: 3, sm: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        bgcolor: systemColors.indigo[50],
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: systemColors.indigo[900],
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
        }}
      >
        Bem-vindo ao FitScore LEGAL™
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: systemColors.indigo[700],
          textAlign: "center",
          maxWidth: 700,
          mb: 4,
        }}
      >
        Nosso sistema de avaliação de candidatos fornece análises dinâmicas de
        Performance, Energia e Cultura, com notificações automáticas e
        resultados em tempo real. Agilize seu processo seletivo de forma
        transparente e eficiente.
      </Typography>

      <Divider
        sx={{ width: "60%", mb: 5, borderColor: systemColors.indigo[300] }}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          mb: 5,
        }}
      >
        {features.map((feature, idx) => (
          <Card
            key={idx}
            sx={{
              width: { xs: "100%", sm: 280 },
              bgcolor: systemColors.indigo[100],
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 4,
              px: 3,
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            {feature.icon}
            <Typography
              variant="h6"
              sx={{ mt: 2, mb: 1, fontWeight: "bold", textAlign: "center" }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: systemColors.indigo[900],
                mb: feature.isAction ? 2 : 0,
              }}
            >
              {feature.description}
            </Typography>

            {feature.isAction && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <StyledButton
                  label="Cadastre-se"
                  onClick={() => navTo(Routes.REGISTER)}
                />
                <StyledButton
                  label="Login"
                  onClick={() => navTo(Routes.LOGIN)}
                />
              </Box>
            )}
          </Card>
        ))}
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: systemColors.indigo[600],
          textAlign: "center",
          maxWidth: 700,
        }}
      >
        FitScore LEGAL™ — Tornando o processo seletivo mais transparente e
        eficiente para sua empresa.
      </Typography>
    </Box>
  );
}
