import Footer from "@/components/guild-dashboard/Footer";
import GuildDashboardContainer from "@/components/guild-dashboard/GuildDashboardContainer";
import Navbar from "@/components/guild-dashboard/Navbar";
import Sidebar from "@/components/guild-dashboard/Sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "../styles/globals.css";
import Loading from "./loading";
import SocketProvider from "@/context/SocketContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mezo Bot",
  description: "MezoBot|Dashboard",
};

export default async function GuildDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <SocketProvider>
        <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />
          <div className="flex flex-col ">
            <Navbar />
            <Toaster position="top-center" />
            <GuildDashboardContainer>{children}</GuildDashboardContainer>
            <Footer />
          </div>
        </section>
      </SocketProvider>
    </Suspense>
  );
}
