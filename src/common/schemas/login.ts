import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .matches(
      passwordRules,
      "A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial."
    )
    .required("Senha é obrigatória"),
});
