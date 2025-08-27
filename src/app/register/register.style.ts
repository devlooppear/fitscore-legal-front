import systemColors from "@/common/constants/systemColors";
import { Box, Card, CardContent, styled } from "@mui/material";

export const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
});

export const StyledCard = styled(Card)({
  width: "100%",
  maxWidth: 420,
  borderRadius: "16px",
  boxShadow: `0px 8px 24px ${systemColors.gray[300]}`,
  transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `0px 12px 28px ${systemColors.gray[400]}`,
  },
});

export const StyledCardContent = styled(CardContent)({
  padding: "32px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export const FooterBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: 8,
  marginTop: 12,
  alignItems: "center",
});
