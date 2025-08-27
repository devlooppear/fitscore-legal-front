import { UserType } from "@/enum/userType";

export interface AuthContextType {
  token: string | null;
  userType: UserType | null;
  login: (token: string, type?: UserType) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  getToken: () => Promise<string | null>;
}
