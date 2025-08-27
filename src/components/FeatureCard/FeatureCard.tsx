"use client";

import React from "react";
import { Card, Typography, Box } from "@mui/material";
import systemColors from "@/common/constants/systemColors";
import StyledButton from "@/components/StyledButton/StyledButton";

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actions?: { label: string; onClick: () => void }[];
}

export default function FeatureCard({
  icon,
  title,
  description,
  actions,
}: FeatureCardProps) {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: 280 },
        bgcolor: systemColors.blue[100],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        px: 3,
        transition: "all 0.3s",
        boxShadow: `0 2px 6px ${systemColors.blue[400]}, 0 8px 20px ${systemColors.blue[200]}`,
        borderRadius: 2,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 6px 16px ${systemColors.blue[500]}, 0 10px 24px ${systemColors.blue[300]}`,
        },
      }}
    >
      {icon}
      <Typography
        variant="h6"
        sx={{ mt: 2, mb: 1, fontWeight: "bold", textAlign: "center" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ textAlign: "center", color: systemColors.blue[900] }}
      >
        {description}
      </Typography>

      {actions && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {actions.map((action, idx) => (
            <StyledButton
              key={idx}
              label={action.label}
              onClick={action.onClick}
            />
          ))}
        </Box>
      )}
    </Card>
  );
}
