"use client";

import React from "react";
import { Card, CardContent, Typography, Divider, Box, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserType } from "@/enum/userType";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useRegister/useRegister";
import { RegisterCredentials } from "@/hooks/useRegister/interface";
import { registerUserSchema } from "@/common/schemas/registerUser";
import { toast } from "@/common/utils/toast";
import systemColors from "@/common/constants/systemColors";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FormTextField from "@/components/FormTextField/FormTextField";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { Routes } from "@/common/constants/routes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

export default function RegisterPage() {
  const { register: registerUser, isLoading, error } = useRegister();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(registerUserSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserType.CANDIDATE,
    },
  });

  const onSubmit = async (data: RegisterCredentials) => {
    const response = await registerUser({
      ...data,
      role: UserType.CANDIDATE,
    });

    if (response) {
      toast.success("Cadastro realizado com sucesso!");
      router.push(Routes.LOGIN);
    } else if (error) {
      toast.error(
        typeof error === "string" ? error : "Ocorreu um erro no registro"
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
              Criar Conta
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              name="name"
              control={control}
              label="Nome"
              error={errors.name?.message}
              icon={<PersonIcon color="primary" />}
            />

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

            <SubmitButton isLoading={isLoading} label="Registrar" />
          </StyledForm>

          <FooterBox>
            <Typography variant="body2">Já tem uma conta?</Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => router.push(Routes.LOGIN)}
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Entrar
            </Link>
          </FooterBox>
        </StyledCardContent>
      </StyledCard>
    </StyledContainer>
  );
}
