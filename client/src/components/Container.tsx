import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="px-10 md:px-24">{children}</div>;
};

export default Container;
