"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { FaClipboardList, FaUserCheck } from "react-icons/fa";
import StyledButton from "@/components/StyledButton/StyledButton";
import { useAuth } from "@/provider/auth/AuthProvider";
import { useWhoAmI } from "@/hooks/useWhoAmI/useWhoAmI";
import { useTranslation } from "react-i18next";
import { Routes } from "@/common/constants/routes";
import systemColors from "@/common/constants/systemColors";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { UserType } from "@/enum/userType";

export default function HomePage() {
  const { userType, token } = useAuth();
  const { navTo } = useNavTo();
  const { user } = useWhoAmI();
  const { t } = useTranslation("home");

  if (!token) {
    navTo(Routes.INTRODUCTION);
    return null;
  }

  const isCandidate = userType === UserType.CANDIDATE;
  const isRecruiter = userType === UserType.RECRUITER;

  let firstName = "";
  if (user && user.name) {
    firstName = user.name.split(" ")[0];
  } else if (user && user.email) {
    const emailName = user.email.split("@")[0];
    firstName = emailName.split(/[._-]/)[0];
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

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
          ? t("greetingCandidate", { name: firstName || t("defaultFriend") })
          : isRecruiter
          ? t("greetingRecruiter", { name: firstName || t("defaultFriend") })
          : t("greetingDefault")}
      </Typography>

      <Typography variant="body1" sx={{ color: systemColors.indigo[700] }}>
        {isCandidate ? t("welcomeCandidate") : t("welcomeRecruiter")}
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
              {t("startTestTitle")}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              {t("startTestDesc")}
            </Typography>
            <StyledButton
              label={t("startTestBtn")}
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
              {t("dashboardTitle")}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              {t("dashboardDesc")}
            </Typography>
            <StyledButton
              label={t("dashboardBtn")}
              onClick={() => navTo(Routes.DASHBOARD)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
