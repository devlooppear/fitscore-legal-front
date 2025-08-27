import { UserType } from "@/enum/userType";
import * as yup from "yup";
import { passwordRules } from "../constants/rules";

export const registerUserSchema = yup
  .object({
    name: yup
      .string()
      .required("Nome é obrigatório")
      .min(3, "O nome deve ter no mínimo 3 caracteres")
      .max(50, "O nome deve ter no máximo 50 caracteres")
      .test(
        "full-name",
        "Informe nome e sobrenome",
        (value) => !!value && value.trim().split(" ").length >= 2
      ),

    email: yup.string().email("Email inválido").required("Email é obrigatório"),

    password: yup
      .string()
      .matches(
        passwordRules,
        "A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial."
      )
      .required("Senha é obrigatória"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas devem ser iguais")
      .required("Confirme sua senha"),

    role: yup
      .mixed<UserType>()
      .oneOf([UserType.CANDIDATE, UserType.RECRUITER])
      .required("Selecione o tipo de usuário"),
  })
  .required();
