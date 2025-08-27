"use client";

import React, { useState } from "react";
import { Typography, Divider, Box, Link, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserType } from "@/enum/userType";
import { toast } from "@/common/utils/toast";

import { useRegister } from "@/hooks/useRegister/useRegister";
import { RegisterCredentials } from "@/hooks/useRegister/interface";
import { registerUserSchema } from "@/common/schemas/registerUser";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import systemColors from "@/common/constants/systemColors";

import FormTextField from "@/components/FormTextField/FormTextField";
import StyledButton from "@/components/StyledButton/StyledButton";
import { Routes } from "@/common/constants/routes";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  FooterBox,
  StyledCard,
  StyledCardContent,
  StyledContainer,
  StyledForm,
} from "./register.style";

export default function RegisterPage() {
  const { register: registerUser, isLoading, error } = useRegister();
  const { navTo } = useNavTo();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      confirmPassword: "",
      role: UserType.CANDIDATE,
    },
  });

  const onSubmit = async (data: RegisterCredentials) => {
    const response = await registerUser({ ...data, role: UserType.CANDIDATE });
    if (response) {
      toast.success("Cadastro realizado com sucesso!");
      navTo(Routes.LOGIN);
    } else {
      toast.error(typeof error === "string" ? error : "Ocorreu um erro no registro");
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledCardContent>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <AccountCircleIcon sx={{ color: systemColors.blue[700] }} />
            <Typography variant="h5" sx={{ color: systemColors.blue[700], fontWeight: "bold" }}>
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
              type={showPassword ? "text" : "password"}
              error={errors.password?.message}
              icon={<LockIcon color="primary" />}
              endAdornment={
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              }
            />

            <FormTextField
              name="confirmPassword"
              control={control}
              label="Confirmar Senha"
              type={showConfirmPassword ? "text" : "password"}
              error={errors.confirmPassword?.message}
              icon={<LockIcon color="primary" />}
              endAdornment={
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              }
            />

            <StyledButton isLoading={isLoading} label="Registrar" />
          </StyledForm>

          <FooterBox>
            <Typography variant="body2">Já tem uma conta?</Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => navTo(Routes.LOGIN)}
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
