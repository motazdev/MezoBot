import { authOptions } from "@/app/utils/auth";
import { Menu } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../components/ui/button";
import LoginButton from "./LoginButton";
import { ThemeToggleButton } from "./ThemeToggleButton";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserDropdownMenuButton from "./UserDropdownMenuButton";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className=" top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-24">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href={"/"} className="logo">
          <p className="font-bold text-lg">MezoBot</p>
        </Link>
        <Link
          href="#features"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Features
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href={"/"} className="logo">
              <p className="font-bold text-lg">MezoBot</p>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <Link href={"/"} className="logo md:hidden block">
        <p className="font-bold text-lg">MezoBot</p>
      </Link>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto">
          {!session?.user ? (
            <LoginButton />
          ) : (
            <UserDropdownMenuButton session={session} />
          )}
        </div>

        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Navbar;
