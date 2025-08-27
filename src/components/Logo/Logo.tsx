"use client";

import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { useAuth } from "@/provider/auth/AuthProvider";
import systemColors from "@/common/constants/systemColors";
import { Routes } from "@/common/constants/routes";

export interface LogoProps {
  size?: "small" | "medium" | "large" | number;
  canNav?: boolean;
}

const sizeMap = {
  small: 40,
  medium: 60,
  large: 80,
};

export default function Logo({ size = "medium", canNav = false }: LogoProps) {
  const dimension =
    typeof size === "number" ? size : sizeMap[size] ?? sizeMap.medium;
  const { navTo } = useNavTo();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (!canNav) return;
    navTo(isAuthenticated ? Routes.HOME : Routes.INTRODUCTION);
  };

  return (
    <Box
      onClick={handleClick}
      display="flex"
      alignItems="center"
      sx={{
        cursor: canNav ? "pointer" : "default",
        borderRadius: 2,
        border: `2px solid ${systemColors.blue[500]}`,
        boxShadow: `0 4px 12px ${systemColors.blue[800]}`,
        "&:hover": {
          boxShadow: canNav
            ? `0 6px 16px ${systemColors.blue[900]}`
            : `0 4px 12px ${systemColors.blue[800]}`,
        },
        transition: "all 0.3s ease",
      }}
    >
      <Image
        src="/logo/android-chrome-512x512.png"
        alt="FitScore Legal Logo"
        width={dimension}
        height={dimension}
        priority
        style={{ borderRadius: 8 }}
      />
    </Box>
  );
}
