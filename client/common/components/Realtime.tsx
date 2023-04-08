"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";

export function Realtime({ eventName }: { eventName: string }) {
  const { refresh } = useRouter();

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on(eventName, () => {
      refresh();
    });
    return () => {
      socket.off(eventName);
    };
  }, [eventName, refresh]);

  return null;
}
