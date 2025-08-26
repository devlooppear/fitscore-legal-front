"use client";

import { useMutation } from "@/hooks/useMutation/useMutation";
import { endpoints } from "@/common/constants/endpoints";
import { RegisterCredentials, RegisterResponse } from "./interface";

export function useRegister() {
  const mutation = useMutation<RegisterResponse, RegisterCredentials>({
    endpoint: endpoints.auth.register,
    method: "POST",
  });

  return {
    register: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}
