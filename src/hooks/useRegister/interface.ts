import { UserType } from "@/enum/userType";

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserType;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  role: UserType;
  createdAt: string;
}
