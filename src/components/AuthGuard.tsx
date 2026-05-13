"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useAuth } from "@/lib/useAuth";

type Props = {
  children: ReactNode;
  loginPath?: string;
};

export default function AuthGuard({ children, loginPath = "/auth/login" }: Props) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(loginPath);
    }
  }, [user, isLoading, router, loginPath]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#A0A0A0",
          fontSize: 14,
        }}
      >
        Loading…
      </div>
    );
  }

  if (!user) {
    // The effect above will redirect; render nothing during the brief gap.
    return null;
  }

  return <>{children}</>;
}
