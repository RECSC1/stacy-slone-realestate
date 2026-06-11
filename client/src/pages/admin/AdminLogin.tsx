import { useEffect } from "react";
import { useLocation } from "wouter";
import { Lock, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Seo } from "@/components/Seo";
import { SITE } from "@/config/site";

export default function AdminLogin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated && user?.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [loading, isAuthenticated, user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <Seo title="Admin Login" description="Secure admin access." />
      <div className="w-full max-w-md border border-border bg-card p-10 shadow-lg">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h1 className="mt-6 text-center font-serif text-3xl text-foreground">
          Admin Access
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {SITE.agentName} &middot; {SITE.brokerage}
        </p>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isAuthenticated && user?.role !== "admin" ? (
          <div className="mt-8 border border-destructive/30 bg-destructive/5 p-4 text-center text-sm text-destructive">
            This account doesn't have admin access. Please sign in with the owner
            account, or contact the site administrator.
          </div>
        ) : (
          <>
            <a
              href={getLoginUrl()}
              className="mt-8 flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
            >
              <ShieldCheck className="h-4 w-4" /> Secure Sign In
            </a>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              Access is protected by secure authentication. Only authorized
              administrators can view leads and manage content.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
