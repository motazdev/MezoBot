"use client";
import { createContext, useContext, useEffect, useState } from "react";
import * as socketIO from "socket.io-client";
import { toast } from "sonner";

export interface ISocketContext {
  socket: any;
}

const SocketContext = createContext({});

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<socketIO.Socket>();

  // useEffect(() => {
  //   const socket = socketIO.io("http://localhost:3001", { autoConnect: true });

  //   socket.on("ticket_created", (data) => {
  //     toast.success(data);
  //   });
  //   setSocket(socket);
  //   return () => {
  //     socket.off("connect");
  //     socket.off("ticket_created");
  //     socket.off("disconnect");
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
