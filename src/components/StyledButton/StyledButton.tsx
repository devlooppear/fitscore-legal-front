"use client";

import React from "react";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import systemColors from "@/common/constants/systemColors";
import { SubmitButtonProps } from "./interface";

const StyleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "uppercase" && prop !== "variant",
})<{ uppercase?: boolean; variant?: "contained" | "outlined" }>(
  ({ uppercase, variant }) => ({
    borderRadius: "12px",
    padding: "12px 16px",
    fontWeight: 600,
    textTransform: uppercase === false ? "none" : "uppercase",
    transition: "all 0.3s ease",
    ...(variant === "contained"
      ? {
          background: `linear-gradient(45deg, ${systemColors.blue[600]} 20%, ${systemColors.blue[800]} 90%)`,
          boxShadow: `0px 4px 10px ${systemColors.gray[400]}`,
          color: systemColors.gray[50],
          "&:hover": {
            background: `linear-gradient(45deg, ${systemColors.blue[700]} 30%, ${systemColors.blue[900]} 90%)`,
            boxShadow: `0px 6px 14px ${systemColors.gray[500]}`,
          },
          "&:disabled": {
            background: systemColors.gray[300],
            color: systemColors.gray[600],
            boxShadow: "none",
          },
        }
      : {
          background: "transparent",
          color: systemColors.blue[700],
          border: `2px solid ${systemColors.blue[700]}`,
          "&:hover": {
            color: systemColors.gray[50],
            background: systemColors.blue[700],
            boxShadow: `0px 4px 12px ${systemColors.blue[300]}`,
          },
          "&:disabled": {
            background: "transparent",
            color: systemColors.gray[500],
            border: `2px solid ${systemColors.gray[400]}`,
            boxShadow: "none",
          },
        }),
  })
);

export default function StyledButton({
  isLoading = false,
  label,
  uppercase = true,
  variant = "contained",
  ...props
}: SubmitButtonProps & { variant?: "contained" | "outlined" }) {
  return (
    <StyleButton
      type="submit"
      variant={variant}
      disabled={isLoading || props.disabled}
      uppercase={uppercase}
      {...props}
    >
      {isLoading ? (
        <CircularProgress
          size={22}
          thickness={5}
          sx={{
            color:
              variant === "contained"
                ? systemColors.gray[100]
                : systemColors.blue[50],
          }}
        />
      ) : (
        label
      )}
    </StyleButton>
  );
}
