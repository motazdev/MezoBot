"use client";
import { ReactNode, createContext, useContext, useState } from "react";

const GuildContext = createContext({});

export function AppWrapper({ children }: { children: ReactNode }) {
  let [state, setState] = useState({
    guild: "Guild",
  });

  return (
    <GuildContext.Provider value={state}>{children}</GuildContext.Provider>
  );
}

export function useGuildContext() {
  return useContext(GuildContext);
}
