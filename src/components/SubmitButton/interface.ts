import { ButtonProps } from "@mui/material";

export interface SubmitButtonProps extends ButtonProps {
  isLoading: boolean;
  label: string;
  uppercase?: boolean;
}
