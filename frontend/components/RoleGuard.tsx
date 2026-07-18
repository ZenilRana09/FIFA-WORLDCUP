"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function RoleGuard({
  allowed,
  children,
}: {
  allowed: string[];
  children: ReactNode;
}) {
  const { session, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (role && !allowed.includes(role)) {
      router.push(`/dashboard/${role}`);
    }
  }, [session, role, loading, allowed, router]);

  if (loading || !session || (role && !allowed.includes(role))) {
    return (
      <p className="text-center text-gray-500 py-10">
        Loading...
      </p>
    );
  }

  return <>{children}</>;
}