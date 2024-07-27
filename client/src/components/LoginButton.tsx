"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

const LoginButton = () => {
  return (
    <Button variant={"ghost"} onClick={() => signIn("discord")}>
      Login
    </Button>
  );
};

export default LoginButton;
