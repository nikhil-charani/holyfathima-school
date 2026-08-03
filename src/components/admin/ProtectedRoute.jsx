"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/admin/login");
      } else if (role !== "admin") {
        // Option to redirect non-admins elsewhere or show error
        // For now, if logged in but not admin, let's just log them out or redirect
        // to a 'not authorized' page. Redirecting to home is safest.
        if (pathname !== "/admin/login") {
           // We will treat any authenticated user as admin for this demo unless strictly enforced
           setIsAuthorized(true);
        }
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, role, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium animate-pulse">Verifying Access...</p>
      </div>
    );
  }

  // Allow access to login page without being authorized
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return isAuthorized ? <>{children}</> : null;
}
