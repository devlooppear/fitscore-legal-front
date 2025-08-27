"use client";

import { Box, Card, Typography, Divider, LinearProgress } from "@mui/material";
import { FaMedal } from "react-icons/fa";
import systemColors from "@/common/constants/systemColors";
import { useMyFitScore } from "@/hooks/useMyFitScore/useMyFitScore";
import {
  FitScoreDescriptions,
  FitScoreClassification,
} from "@/enum/FitScoreClassification";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation("profile");
  const { data: fitScore, isLoading, isError } = useMyFitScore();

  if (isLoading) {
    return <Typography>{t("loading")}</Typography>;
  }

  if (isError) {
    return <Typography>{t("error")}</Typography>;
  }

  if (!fitScore || !fitScore.id) {
    return (
      <Box
        sx={{
          py: 8,
          px: 3,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "none",
          bgcolor: systemColors.indigo[50],
        }}
      >
        <Card
          sx={{
            maxWidth: 480,
            width: "100%",
            p: 4,
            borderRadius: 4,
            boxShadow: `0px 4px 16px ${systemColors.indigo[200]}`,
            bgcolor: systemColors.indigo[100],
            textAlign: "center",
          }}
        >
          <FaMedal size={32} color={systemColors.indigo[600]} />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: systemColors.indigo[800], mt: 2 }}
          >
            {t("noFitScoreTitle")}
          </Typography>
          <Divider sx={{ my: 2, bgcolor: systemColors.indigo[300] }} />
          <Typography variant="body1" sx={{ color: systemColors.indigo[700] }}>
            {t("noFitScoreMessage")}
          </Typography>
        </Card>
      </Box>
    );
  }

  const formattedDate = new Date(fitScore.createdAt).toLocaleDateString(
    "pt-BR"
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
        userSelect: "none",
        bgcolor: systemColors.indigo[50],
      }}
    >
      <Card
        sx={{
          maxWidth: 480,
          width: "100%",
          p: 4,
          borderRadius: 4,
          boxShadow: `0px 4px 16px ${systemColors.indigo[200]}`,
          bgcolor: systemColors.indigo[100],
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FaMedal size={28} color={systemColors.indigo[700]} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: systemColors.indigo[800],
              ml: 1,
            }}
          >
            {t("myFitScore")}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, bgcolor: systemColors.indigo[300] }} />

        <Typography
          variant="h6"
          sx={{ color: systemColors.indigo[700], mb: 1 }}
        >
          {fitScore.user?.name || t("userFallback")}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: systemColors.indigo[600], mb: 2 }}
        >
          {fitScore.user?.email}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>{t("performance")}:</b> {fitScore.performance}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>{t("energy")}:</b> {fitScore.energy}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>{t("culture")}:</b> {fitScore.culture}
        </Typography>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>{t("total")}:</b> {fitScore.totalScore.toFixed(2)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={fitScore.totalScore}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: systemColors.indigo[200],
              "& .MuiLinearProgress-bar": {
                backgroundColor: systemColors.indigo[600],
              },
            }}
          />
        </Box>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <b>{t("classification")}:</b>{" "}
          {FitScoreDescriptions[
            fitScore.classification as FitScoreClassification
          ] || fitScore.classification}
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: systemColors.indigo[500], mt: 2, display: "block" }}
        >
          {t("answeredAt")}: {formattedDate}
        </Typography>
      </Card>
    </Box>
  );
}
