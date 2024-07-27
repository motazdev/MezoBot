import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/components/Provider";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/guild-dashboard/Sidebar/Sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MezoBot | Advanced Tickets System",
  description:
    "Transform the way you handle support on your Discord server with our powerful bot.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <main>{children}</main>
    </section>
  );
}
