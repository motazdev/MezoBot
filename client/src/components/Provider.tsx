"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
