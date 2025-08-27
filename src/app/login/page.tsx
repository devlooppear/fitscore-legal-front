"use client";

import React, { useState } from "react";
import { Typography, Divider, Box, Link, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "@/common/utils/toast";

import { useLogin } from "@/hooks/useLogin/useLogin";
import { loginSchema } from "@/common/schemas/login";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import FormTextField from "@/components/FormTextField/FormTextField";
import StyledButton from "@/components/StyledButton/StyledButton";
import { Routes } from "@/common/constants/routes";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import systemColors from "@/common/constants/systemColors";
import {
  FooterBox,
  StyledCard,
  StyledCardContent,
  StyledContainer,
  StyledForm,
} from "./login.style";
import { LoginFormData } from "./interface";

export default function LoginPage() {
  const { login, isLoading, error } = useLogin();
  const { navTo } = useNavTo();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success("Login realizado com sucesso!");
      navTo(Routes.HOME);
    } catch {
      toast.error(typeof error === "string" ? error : "Falha ao realizar login");
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledCardContent>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <AccountCircleIcon sx={{ color: systemColors.blue[700] }} />
            <Typography variant="h5" sx={{ color: systemColors.blue[700], fontWeight: "bold" }}>
              Login
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              name="email"
              control={control}
              label="Email"
              type="email"
              error={errors.email?.message}
              icon={<EmailIcon color="primary" />}
            />

            <FormTextField
              name="password"
              control={control}
              label="Senha"
              type={showPassword ? "text" : "password"}
              error={errors.password?.message}
              icon={<LockIcon color="primary" />}
              endAdornment={
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              }
            />

            <StyledButton isLoading={isLoading} label="Entrar" />
          </StyledForm>

          <FooterBox>
            <Typography variant="body2">Não tem conta?</Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => navTo(Routes.REGISTER)}
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Criar
            </Link>
          </FooterBox>
        </StyledCardContent>
      </StyledCard>
    </StyledContainer>
  );
}
