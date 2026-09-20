import { useEffect, useState } from "react";
import { Redirect } from "wouter";
import {
  getAdminToken,
  verifyAdminToken,
} from "@/services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const token = getAdminToken();

      if (!token) {
        setAuthenticated(false);
        setChecking(false);
        return;
      }

      const valid = await verifyAdminToken();

      setAuthenticated(valid);
      setChecking(false);
    }

    checkAuthentication();
  }, []);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--paper)]">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--body)]">
          Checking authentication...
        </p>
      </main>
    );
  }

  if (!authenticated) {
    return <Redirect to="/admin/login" />;
  }

  return <>{children}</>;
}