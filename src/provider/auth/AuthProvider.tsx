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
import { AuthContextType, WhoAmIResponse } from "./interface";
import { STORES } from "@/common/constants/db";
import { UserType } from "@/enum/userType";
import { useQuery } from "@/hooks/useQuery/useQuery";
import { endpoints } from "@/common/constants/endpoints";
import Loader from "@/components/Loader/Loader";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenForQuery, setTokenForQuery] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const storedToken = await getValue(STORES.AUTH, "token");
      const storedTime = await getValue(STORES.AUTH, "token_time");

      if (storedToken && storedTime) {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (now - storedTime > oneDay) {
          await logout();
          setLoading(false);
          return;
        }

        setToken(storedToken);
        setTokenForQuery(storedToken);

        if (publicRoutes.includes(pathname)) {
          router.push(Routes.HOME);
        }
      } else {
        if (!token && !publicRoutes.includes(pathname)) {
          router.push(Routes.INTRODUCTION);
        }
      }
      setLoading(false);
    };

    checkToken();
  }, [getValue, router, pathname, token]);

  const {
    data: meData,
    isLoading: meLoading,
    refetch,
  } = useQuery<WhoAmIResponse>({
    queryKey: ["whoAmI"],
    endpoint: endpoints.users.me,
    enabled: !!tokenForQuery,
  });

  useEffect(() => {
    if (meData?.role) {
      setUserType(meData.role);
      setValue(STORES.AUTH, "user_type", meData.role);
    }
  }, [meData, setValue]);

  const login = async (newToken: string, type?: UserType) => {
    setToken(newToken);
    setTokenForQuery(newToken);

    if (type) {
      setUserType(type);
      await setValue(STORES.AUTH, "user_type", type);
    }

    const now = Date.now();
    await setValue(STORES.AUTH, "token", newToken);
    await setValue(STORES.AUTH, "token_time", now);

    if (!type && refetch) {
      await refetch();
    }
  };

  const logout = async () => {
    setToken(null);
    setTokenForQuery(null);
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
      value={{
        token,
        userType,
        login,
        logout,
        isAuthenticated,
        getToken,
        loading: loading || meLoading,
        refetchUser: refetch,
      }}
    >
      {loading || meLoading ? <Loader inAll /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
