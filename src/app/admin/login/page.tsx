"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Admin login now redirects to the shared /login page with admin callback
export default function AdminLogin() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login?callbackUrl=/admin");
  }, [router]);

  return (
    <div className="min-h-screen bg-base flex items-center justify-center">
      <p className="text-text-muted text-xs uppercase tracking-wider">
        Redirecting...
      </p>
    </div>
  );
}
