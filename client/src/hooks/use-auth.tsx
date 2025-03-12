import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type User, type InsertUser } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: ReturnType<typeof useLoginMutation>;
  registerMutation: ReturnType<typeof useRegisterMutation>;
  logoutMutation: ReturnType<typeof useLogoutMutation>;
};

const AuthContext = createContext<AuthContextType | null>(null);

function useLoginMutation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      const data = await res.json();
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/me"], { user });
      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.name}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

function useRegisterMutation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertUser) => {
      const res = await apiRequest("POST", "/api/register", data);
      const json = await res.json();
      return json.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/me"], { user });
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

function useLogoutMutation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/me"], { user: null });
      toast({
        title: "Goodbye!",
        description: "You have been logged out",
      });
    },
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useQuery<{ user: User | null }>({
    queryKey: ["/api/me"],
    retry: false,
  });

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const logoutMutation = useLogoutMutation();

  return (
    <AuthContext.Provider
      value={{
        user: data?.user ?? null,
        isLoading,
        error: error as Error | null,
        loginMutation,
        registerMutation,
        logoutMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
