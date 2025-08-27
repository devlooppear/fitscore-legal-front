import { useAuth } from "../useAuth/useAuth";
import { LoginCredentials } from "./interface";
import { useMutation } from "@/hooks/useMutation/useMutation";
import { endpoints } from "@/common/constants/endpoints";

export function useLogin() {
  const { login: setAuthToken } = useAuth();

  const mutation = useMutation<string, LoginCredentials>({
    endpoint: endpoints.auth.login,
    method: "POST",
    config: {
      onSuccess: (response: { access_token: string }) => {
        return setAuthToken(response.access_token);
      },
    },
  });

  return {
    login: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}
