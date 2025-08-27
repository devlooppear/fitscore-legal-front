"use client";

import React from "react";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import systemColors from "@/common/constants/systemColors";
import { SubmitButtonProps } from "./interface";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "uppercase",
})<{ uppercase?: boolean }>(({ uppercase }) => ({
  background: `linear-gradient(45deg, ${systemColors.blue[600]} 20%, ${systemColors.blue[800]} 90%)`,
  borderRadius: "12px",
  padding: "12px 16px",
  fontWeight: 600,
  textTransform: uppercase === false ? "none" : "uppercase",
  boxShadow: `0px 4px 10px ${systemColors.gray[400]}`,
  transition: "all 0.3s ease",
  "&:hover": {
    background: `linear-gradient(45deg, ${systemColors.blue[700]} 30%, ${systemColors.blue[900]} 90%)`,
    boxShadow: `0px 6px 14px ${systemColors.gray[500]}`,
  },
  "&:disabled": {
    background: systemColors.gray[300],
    color: systemColors.gray[600],
    boxShadow: "none",
  },
}));

export default function SubmitButton({
  isLoading,
  label,
  uppercase = true,
  ...props
}: SubmitButtonProps) {
  return (
    <StyledButton
      type="submit"
      variant="contained"
      disabled={isLoading || props.disabled}
      uppercase={uppercase}
      {...props}
    >
      {isLoading ? (
        <CircularProgress
          size={22}
          thickness={5}
          sx={{ color: systemColors.gray[100] }}
        />
      ) : (
        label
      )}
    </StyledButton>
  );
}
