"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useIndexedDB } from "@/provider/db/IndexedDBProvider";
import { Routes } from "@/common/constants/routes";
import { AuthContextType } from "./interface";
import { STORES } from "@/common/constants/db";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { getValue, setValue, deleteValue } = useIndexedDB();

  const publicRoutes: string[] = [Routes.INTRODUCTION, Routes.LOGIN, Routes.REGISTER];

  // 🔹 Checa token e expiração
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getValue(STORES.AUTH, "token");
      const storedTime = await getValue(STORES.AUTH, "token_time"); // timestamp do login

      if (storedToken && storedTime) {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (now - storedTime > oneDay) {
          // 🔹 Token expirou
          await logout();
          return;
        }

        setToken(storedToken);

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

  // 🔹 Login: salva token + timestamp
  const login = async (newToken: string) => {
    setToken(newToken);
    const now = Date.now();
    await setValue(STORES.AUTH, "token", newToken);
    await setValue(STORES.AUTH, "token_time", now);
  };

  // 🔹 Logout: remove token + timestamp
  const logout = async () => {
    setToken(null);
    await deleteValue(STORES.AUTH, "token");
    await deleteValue(STORES.AUTH, "token_time");
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
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
