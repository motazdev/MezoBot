import { ReactNode } from "react";

const NavbarContainer = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto max-h-screen px-24 md:px-18">{children}</div>;
};

export default NavbarContainer;
