"use client";

import React from "react";
import { Card, CardContent, Typography, Divider, Box, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "@/common/utils/toast";

import { useLogin } from "@/hooks/useLogin/useLogin";
import { loginSchema } from "@/common/schemas/login";
import FormTextField from "@/components/FormTextField/FormTextField";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { Routes } from "@/common/constants/routes";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import systemColors from "@/common/constants/systemColors";

const StyledContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
});

const StyledCard = styled(Card)({
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

const StyledCardContent = styled(CardContent)({
  padding: "32px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const FooterBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: 8,
  marginTop: 12,
  alignItems: "center",
});

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login, isLoading, error } = useLogin();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success("Login realizado com sucesso!");
      router.push(Routes.HOME);
    } catch (err) {
      toast.error(
        typeof error === "string" ? error : "Falha ao realizar login"
      );
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledCardContent>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <AccountCircleIcon sx={{ color: systemColors.blue[700] }} />
            <Typography
              variant="h5"
              sx={{ color: systemColors.blue[700], fontWeight: "bold" }}
            >
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
              type="password"
              error={errors.password?.message}
              icon={<LockIcon color="primary" />}
            />

            <SubmitButton isLoading={isLoading} label="Entrar" />
          </StyledForm>

          <FooterBox>
            <Typography variant="body2">Não tem conta?</Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => router.push(Routes.REGISTER)}
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
