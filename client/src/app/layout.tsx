import AuthProvider from "@/components/AuthProvider";
import Provider from "@/components/Provider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./styles/globals.css";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className={cn("relative h-full antialiased", poppins.className)}>
        <AuthProvider>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
            </ThemeProvider>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
