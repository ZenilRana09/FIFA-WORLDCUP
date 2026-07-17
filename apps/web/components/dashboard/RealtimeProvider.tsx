"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

export default function RealtimeProvider() {
  const router = useRouter();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
    });

    socket.on("incident:new", (incident) => {
      console.log("🚨 New Incident:", incident);
      router.refresh();
    });

    socket.on("incident:updated", () => {
      router.refresh();
    });

    socket.on("incident:deleted", () => {
      router.refresh();
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("incident:new");
      socket.off("incident:updated");
      socket.off("incident:deleted");
      socket.disconnect();
    };
  }, [router]);

  return null;
}