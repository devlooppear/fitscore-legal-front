"use client";

import { useEffect } from "react";
import { useQuery } from "@/hooks/useQuery/useQuery";
import { useAuth } from "@/provider/auth/AuthProvider";
import { Routes } from "@/common/constants/routes";
import { UserType } from "@/enum/userType";
import { useRouter } from "next/navigation";
import { endpoints } from "@/common/constants/endpoints";

interface WhoAmIResponse {
  userId: number;
  email: string;
  role: UserType;
  name?: string;
}

export function useWhoAmI() {
  const { login, userType, isAuthenticated } = useAuth();
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useQuery<WhoAmIResponse>({
    queryKey: ["whoAmI"],
    endpoint: endpoints.users.me,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (data && isAuthenticated && !userType) {
      login("", data.role);
    }
  }, [data, isAuthenticated, userType, login]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push(Routes.INTRODUCTION);
    }
  }, [isAuthenticated, isLoading, router]);

  return {
    user: data,
    isLoading,
    isError,
    refetch,
  };
}
