"use client";
import { Home, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

import SidebarGuildLogo from "@/components/guild-dashboard/Sidebar/SidebarGuildLogo";
import { useGuildStore } from "@/context/store";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
const Sidebar = () => {
  const { guildId }: { guildId: string } = useParams();
  const { fetchGuild }: any = useGuildStore();
  useEffect(() => {
    fetchGuild(guildId);
  }, [guildId, fetchGuild]);
  const path = usePathname();
  const isActive = (link: string): boolean | null => {
    if (path === `/guild/${guildId}` && link === "/") {
      return true;
    } else if (link !== "/") {
      return path.startsWith(`/guild/${guildId}${link}`);
    }
    return null;
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
        <div className="flex h-14 items-center border-b px-4 lg:h-[150px] lg:px-6">
          <SidebarGuildLogo isMobile={false} />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                isActive("/") && "bg-muted text-primary"
              }`}
              href={`/guild/${guildId}/`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href={`/guild/${guildId}/tickets`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                isActive("/tickets") && "bg-muted text-primary"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              Tickets
            </Link>
            <Link
              href={`/guild/${guildId}/staff`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                isActive("/staff") && "bg-muted text-primary"
              }`}
            >
              <Package className="h-4 w-4" />
              Staff
            </Link>
            <Link
              href={`/guild/${guildId}/ticket-design`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                isActive("/ticket-design") && "bg-muted text-primary"
              }`}
            >
              <Users className="h-4 w-4" />
              Ticket Design
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          {/* TODO :) */}
          {/* 
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
