"use client";

import { usePathname, redirect } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function CmsGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, isWriter } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f1117" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
          <span className="text-sm" style={{ color: "#9ca3af" }}>Checking access...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    redirect(`/auth?redirect=${encodeURIComponent(pathname || "/cms")}`);
  }

  if (!isAdmin && !isWriter) {
    redirect("/cms/unauthorized");
  }

  return <>{children}</>;
}
