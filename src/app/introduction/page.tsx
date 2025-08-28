"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { Routes } from "@/common/constants/routes";
import systemColors from "@/common/constants/systemColors";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import { introductionFeatures } from "@/common/constants/introduction";
import { useTranslation } from "react-i18next";

export default function IntroductionPage() {
  const { navTo } = useNavTo();
  const { t } = useTranslation("introduction");

  const featuresWithActions = introductionFeatures.map((feature) =>
    feature.titleKey === "features.getStarted.title"
      ? {
          ...feature,
          actions: [
            {
              labelKey: "features.getStarted.actions.register",
              onClick: () => navTo(Routes.REGISTER),
            },
            {
              labelKey: "features.getStarted.actions.login",
              onClick: () => navTo(Routes.LOGIN),
            },
          ],
        }
      : feature
  );

  return (
    <Box
      sx={{
        pt: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3 },
        pb: { xs: 5, sm: 8 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        bgcolor: systemColors.blue[50],
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: systemColors.blue[900],
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
        }}
      >
        {t("title")}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: systemColors.blue[700],
          textAlign: "center",
          maxWidth: 700,
          mb: 4,
        }}
      >
        {t("subtitle")}
      </Typography>

      <Divider
        sx={{ width: "60%", mb: 5, borderColor: systemColors.blue[300] }}
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
        {featuresWithActions.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: systemColors.blue[600],
          textAlign: "center",
          maxWidth: 700,
        }}
      >
        {t("footer")}
      </Typography>
    </Box>
  );
}
