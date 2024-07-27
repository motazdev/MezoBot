import { Provider } from "./Session";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

const AuthProvider = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  return <Provider session={session}>{children}</Provider>;
};

export default AuthProvider;
