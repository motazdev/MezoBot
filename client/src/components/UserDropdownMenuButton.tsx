"use client";
import { ChevronDown } from "lucide-react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserDropdownMenuButton = ({ session }: { session: Session | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Button
          asChild
          className={buttonVariants({
            variant: "secondary",
          })}
        >
          <div className="flex flex-row items-center">
            <p>{session?.user.name}</p>
            <ChevronDown className="ml-2" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <Link href="/dashboard">
          <DropdownMenuItem className="cursor-pointer">
            Dashboard
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenuButton;
