import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import DiscordLogo from "./DiscordLogo";
import GithubLogo from "./GithubLogo";
import XLogo from "./XLogo";
const Footer = () => {
  return (
    <footer className="pb-2">
      <div className="container grid-cols-2 md:grid-rows-1 grid-rows-2 max-w-7xl grid  md:grid-cols-3 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold">Connect with Us</h3>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <DiscordLogo />
            Discord Server
          </Link>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <XLogo />X
          </Link>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <GithubLogo />
            GitHub
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Help</h3>
          <Link href="#" prefetch={false}>
            About
          </Link>
          <Link href="#" prefetch={false}>
            Contcat
          </Link>
          <Link href="#" prefetch={false}>
            Terms
          </Link>
          <Link href="#" prefetch={false}>
            Privacy
          </Link>
        </div>
        <div className="grid gap-1 md:col-span-1 md:col-start-3 md:row-start-1 row-start-2 col-span-2 ">
          <h3 className="font-semibold">Invite</h3>
          <p className="text-muted-foreground">
            Add our Discord bot to your server and start using its features.
          </p>
          <Button className="justify-center w-full">
            <PlusIcon className="w-4 h-4 mr-2" />
            Invite Bot
          </Button>
        </div>
      </div>
      <div className="container max-w-7xl mt-8 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Discord Bot. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Fully Developed By MOTAZDEV
        </p>
      </div>
    </footer>
  );
};

export default Footer;
