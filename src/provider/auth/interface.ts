import { UserType } from "@/enum/userType";
import { QueryObserverResult } from "@tanstack/react-query";

export interface AuthContextType {
  token: string | null;
  userType: UserType | null;
  login: (token: string, type?: UserType) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  getToken: () => Promise<string | null>;
  loading: boolean;
  refetchUser?: () => Promise<QueryObserverResult<WhoAmIResponse, Error>>;
}

export interface WhoAmIResponse {
  userId: number;
  email: string;
  role: UserType;
}
