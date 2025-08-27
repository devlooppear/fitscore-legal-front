"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useIndexedDB } from "@/provider/db/IndexedDBProvider";
import { Routes } from "@/common/constants/routes";
import { AuthContextType } from "./interface";
import { STORES } from "@/common/constants/db";
import { UserType } from "@/enum/userType";
import { useQuery } from "@/hooks/useQuery/useQuery";
import { endpoints } from "@/common/constants/endpoints";

interface WhoAmIResponse {
  userId: number;
  email: string;
  role: UserType;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { getValue, setValue, deleteValue } = useIndexedDB();

  const publicRoutes: string[] = [
    Routes.INTRODUCTION,
    Routes.LOGIN,
    Routes.REGISTER,
  ];

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getValue(STORES.AUTH, "token");
      const storedTime = await getValue(STORES.AUTH, "token_time");
      const storedType = (await getValue(
        STORES.AUTH,
        "user_type"
      )) as UserType | null;

      if (storedToken && storedTime) {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (now - storedTime > oneDay) {
          await logout();
          return;
        }

        setToken(storedToken);
        setUserType(storedType ?? null);

        if (publicRoutes.includes(pathname)) {
          router.push(Routes.HOME);
        }
      } else {
        if (!publicRoutes.includes(pathname)) {
          router.push(Routes.INTRODUCTION);
        }
      }
    };

    checkToken();
  }, [getValue, router, pathname]);

  const { data: meData } = useQuery<WhoAmIResponse>({
    queryKey: ["whoAmI"],
    endpoint: endpoints.users.me,
    enabled: !!token && !userType,
  });

  useEffect(() => {
    if (meData && meData.role && !userType) {
      setUserType(meData.role);
      setValue(STORES.AUTH, "user_type", meData.role);
    }
  }, [meData, userType, setValue]);

  const login = async (newToken: string, type?: UserType) => {
    setToken(newToken);
    if (type) {
      setUserType(type);
      await setValue(STORES.AUTH, "user_type", type);
    }
    const now = Date.now();
    await setValue(STORES.AUTH, "token", newToken);
    await setValue(STORES.AUTH, "token_time", now);
  };

  const logout = async () => {
    setToken(null);
    setUserType(null);
    await deleteValue(STORES.AUTH, "token");
    await deleteValue(STORES.AUTH, "token_time");
    await deleteValue(STORES.AUTH, "user_type");
    router.push(Routes.INTRODUCTION);
  };

  const getToken = async (): Promise<string | null> => {
    if (token) return token;
    const storedToken = await getValue(STORES.AUTH, "token");
    setToken(storedToken);
    return storedToken;
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, userType, login, logout, isAuthenticated, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
