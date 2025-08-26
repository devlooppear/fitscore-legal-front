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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { getValue, setValue, deleteValue } = useIndexedDB();

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getValue(STORES.AUTH, "token");

      if (storedToken) {
        setToken(storedToken);

        if (
          pathname === Routes.INTRODUCTION ||
          pathname === Routes.LOGIN ||
          pathname === Routes.REGISTER
        ) {
          router.push(Routes.HOME);
        }
      } else {
        if (
          pathname !== Routes.INTRODUCTION &&
          pathname !== Routes.LOGIN &&
          pathname !== Routes.REGISTER
        ) {
          router.push(Routes.INTRODUCTION);
        }
      }
    };

    checkToken();
  }, [getValue, router, pathname]);

  const login = async (newToken: string) => {
    setToken(newToken);
    await setValue(STORES.AUTH, "token", newToken);
  };

  const logout = async () => {
    setToken(null);
    await deleteValue(STORES.AUTH, "token");
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
      value={{ token, login, logout, isAuthenticated, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
