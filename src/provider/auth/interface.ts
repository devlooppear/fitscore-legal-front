export interface AuthContextType {
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  getToken: () => Promise<string | null>;
}
